import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Use the same CSS file for both functionalities

const AdminPage = () => {
    // State for quiz creation
    const [quiz, setQuiz] = useState({
        quiz_set: '',
        subject: '',
        lesson: '',
        question: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        correct_answer: '',
    });

    // State to track how many quizzes have been sent
    const [quizCount, setQuizCount] = useState(0);

    // State for PDF uploader
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState('');

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

    // Handle quiz form submission (send 10 quizzes with the same quiz_set)
    const handleQuizSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            // Prepare the current quiz data
            const modifiedQuiz = {
                ...quiz,
                question: `${quiz.question} (Question ${quizCount + 1})`, // Modify the question for each quiz
                answer_1: `${quiz.answer_1} ${quizCount + 1}`,
                answer_2: `${quiz.answer_2} ${quizCount + 1}`,
                answer_3: `${quiz.answer_3} ${quizCount + 1}`,
                answer_4: `${quiz.answer_4} ${quizCount + 1}`,
            };

            // Send the quiz data
            const response = await axios.post('http://localhost:8085/api/quizzes/create', modifiedQuiz);
            console.log(`Quiz ${quizCount + 1} created successfully`, response.data);

            // Increment the quiz count
            setQuizCount(quizCount + 1);

            // If 10 quizzes are created, reset everything including quiz_set
            if (quizCount + 1 === 10) {
                setSuccess('All 10 quizzes created successfully!');
                setTimeout(() => {
                    setQuiz({
                        quiz_set: '',
                        subject: '',
                        lesson: '',
                        question: '',
                        answer_1: '',
                        answer_2: '',
                        answer_3: '',
                        answer_4: '',
                        correct_answer: '',
                    });
                    setQuizCount(0); // Reset quiz count
                }, 2000); // Delay before resetting
            } else {
                // Reset all fields except quiz_set, subject, and lesson after each quiz creation
                setQuiz({
                    ...quiz,
                    question: '',
                    answer_1: '',
                    answer_2: '',
                    answer_3: '',
                    answer_4: '',
                    correct_answer: '',
                });
            }
        } catch (error) {
            console.error('There was an error creating the quiz!', error);
            setError('Failed to create quiz');
        } finally {
            setLoading(false);
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
        setUploadSuccess('');

        try {
            const response = await axios.post('http://localhost:8089/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setUploadSuccess('File uploaded successfully!');
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
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
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
                            <button className="dropbtn">{quiz.lesson || 'Select Lesson'}</button>
                            <div className="dropdown-content">
                                {lessons.map((lesson, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        onClick={() => setQuiz({ ...quiz, lesson })}
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
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
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
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
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
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
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
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
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
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
                        />
                    </div>

                    <div className="form-group">
                        <label>Correct Answer:</label>
                        <input
                            type="text"
                            name="correct_answer"
                            value={quiz.correct_answer}
                            onChange={handleQuizChange}
                            required
                            disabled={loading || quizCount === 10} // Disable after creating 10 quizzes
                        />
                    </div>

                    <button type="submit" disabled={loading || quizCount === 10}>
                        {loading ? 'Creating Quiz...' : `Create Quiz ${quizCount + 1}`}
                    </button>

                    {success && <p className="success-message">{success}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <p className="status-message">Creating Question {quizCount + 1}</p>
                </form>
            </div>

            {/* PDF Upload Section */}
            <div className="pdf-upload-section">
                <h2>Upload PDF</h2>
                <form>
                    <div className="form-group">
                        <label>Subject Name:</label>
                        <input
                            type="text"
                            value={subjectName}
                            onChange={handleSubjectChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Lesson Name:</label>
                        <input
                            type="text"
                            value={lessonName}
                            onChange={handleLessonChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Select File:</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                        {fileName && <p>Selected file: {fileName}</p>}
                    </div>

                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload PDF'}
                    </button>

                    {uploadSuccess && <p className="success-message">{uploadSuccess}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
