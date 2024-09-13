import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Use the same CSS file for both functionalities

const AdminPage = () => {
    // State for quiz creation
    const [quiz, setQuiz] = useState({
        quiz_set: '',
        subject: '',
        lession: '',
        question: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        correct_answer: '',
    });

    // State for PDF uploader
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Predefined lists of subjects and lessons for quiz creation
    const subjects = ['Mathematics', 'Science', 'History'];
    const lessons = ['Algebra', 'Geometry', 'Biology', 'Physics'];

    // Handle quiz state changes
    const handleQuizChange = (e) => {
        const { name, value } = e.target;
        setQuiz({
            ...quiz,
            [name]: value,
        });
    };

    // Handle quiz form submission
    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8085/api/quizzes/create', quiz);
            alert('Quiz created successfully');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the quiz!', error);
            alert('Failed to create quiz');
        }
    };

    // Handle PDF file input change
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            setFile(null);
            setFileName('');
        }
    };

    // Handle subject input for PDF
    const handleSubjectChange = (event) => {
        setSubjectName(event.target.value);
    };

    // Handle lesson input for PDF
    const handleLessonChange = (event) => {
        setLessonName(event.target.value);
    };

    // Handle PDF file upload
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
                setFile(null);
                setFileName('');
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
        <div className="admin-page-container">
            {/* Quiz Creation Section */}
            <div className="quiz-section">
                <h2>Create a New Quiz</h2>
                <form onSubmit={handleQuizSubmit} className="quiz-form">
                    <div className="form-group">
                        <label>Quiz Set:</label>
                        <input
                            type="text"
                            name="quiz_set"
                            value={quiz.quiz_set}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <div className="form-group dropdown-container">
                        <label>Subject:</label>
                        <div className="dropdown">
                            <button className="dropbtn">{quiz.subject || 'Select Subject'}</button>
                            <div className="dropdown-content">
                                {subjects.map((subject, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        onClick={() => setQuiz({ ...quiz, subject })}
                                    >
                                        {subject}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group dropdown-container">
                        <label>Lesson:</label>
                        <div className="dropdown">
                            <button className="dropbtn">{quiz.lession || 'Select Lesson'}</button>
                            <div className="dropdown-content">
                                {lessons.map((lesson, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        onClick={() => setQuiz({ ...quiz, lession: lesson })}
                                    >
                                        {lesson}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Question:</label>
                        <textarea
                            name="question"
                            value={quiz.question}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer 1:</label>
                        <input
                            type="text"
                            name="answer_1"
                            value={quiz.answer_1}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer 2:</label>
                        <input
                            type="text"
                            name="answer_2"
                            value={quiz.answer_2}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer 3:</label>
                        <input
                            type="text"
                            name="answer_3"
                            value={quiz.answer_3}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer 4:</label>
                        <input
                            type="text"
                            name="answer_4"
                            value={quiz.answer_4}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Correct Answer (Enter 1-4):</label>
                        <input
                            type="text"
                            name="correct_answer"
                            value={quiz.correct_answer}
                            onChange={handleQuizChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Create Quiz</button>
                </form>
            </div>

            {/* PDF Upload Section */}
            <div className="pdf-section">
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
                {fileName && <p>Selected file: {fileName}</p>}
                <button onClick={handleUpload} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    );
};

export default AdminPage;
