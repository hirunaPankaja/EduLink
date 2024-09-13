import React, { useState } from 'react';
import axios from 'axios';
import './PdfUploader.css';

function PdfUploader() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name); // Update fileName state
            console.log('Selected file:', selectedFile); // Debugging
        } else {
            setFile(null);
            setFileName('');
        }
    };

    const handleSubjectChange = (event) => {
        setSubjectName(event.target.value);
    };

    const handleLessonChange = (event) => {
        setLessonName(event.target.value);
    };

    const handleUpload = async () => {
        if (!file || !subjectName || !lessonName) {
            setError('Please fill all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('subjectName', subjectName);
        formData.append('lessonName', lessonName);

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8089/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSuccess('File uploaded successfully!');
                setFile(null); // Clear the file input
                setFileName(''); // Clear the file name display
            } else {
                setError('File upload failed.');
            }
        } catch (err) {
            setError('File upload failed.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Upload PDF</h2>
            <input
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={handleSubjectChange}
            />
            <input
                type="text"
                placeholder="Enter lesson name"
                value={lessonName}
                onChange={handleLessonChange}
            />
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
            {fileName && <p>Selected file: {fileName}</p>} {/* Show selected file name */}
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default PdfUploader;
