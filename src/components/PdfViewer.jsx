import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import './PdfViewer.css';

// Ensure that the worker is being loaded
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = () => {
    const { subjectName, lessonName } = useParams();
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get(`http://localhost:8089/api/files/view/${subjectName}/${lessonName}`, {
                    responseType: 'arraybuffer',
                });

                if (response.status === 200) {
                    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    setFile(pdfUrl);
                } else {
                    setError('Failed to fetch file');
                }
            } catch (err) {
                console.error('Error fetching file:', err);
                setError('Error fetching file');
            }
        };

        fetchFile();

        return () => {
            if (file) {
                URL.revokeObjectURL(file);
            }
        };
    }, [subjectName, lessonName]);

    const handlePageLoad = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="pdf-viewer-container">
            {error ? (
                <p>{error}</p>
            ) : file ? (
                <Document
                    file={file}
                    onLoadSuccess={handlePageLoad}
                    onLoadError={(error) => setError(`Failed to load PDF: ${error.message}`)}
                >
                    {numPages && Array.from(new Array(numPages), (el, index) => (
                        <Page
                            key={index}
                            pageNumber={index + 1}
                            // Remove scale to use default scaling
                            className="pdf-page"
                        />
                    ))}
                </Document>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PdfViewer;
