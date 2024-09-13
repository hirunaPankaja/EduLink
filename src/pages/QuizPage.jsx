import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPage.css';
import {useParams} from "react-router-dom";

function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const { subjectName, lessonName,quizes } = useParams();
    useEffect(() => {
        // Fetch quizzes when the component mounts
        const fetchQuizzes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8085/api/quizzes/bySubjectAndLesson/${subjectName}/${lessonName}`);
                const formattedQuizzes = response.data.map(quiz => ({
                    question: quiz.question,
                    answers: [quiz.answer_1, quiz.answer_2, quiz.answer_3, quiz.answer_4],
                    correctAnswer: quiz.correct_answer,
                }));
                setQuizzes(formattedQuizzes);
                setError('');
            } catch (err) {
                console.error('Error fetching quizzes:', err);
                setError('Failed to load quiz data');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (timeRemaining > 0 && !quizCompleted) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);

            if (timeRemaining === 0) {
                handleNextQuestion();
            }

            return () => clearInterval(timer);
        }
    }, [timeRemaining, quizCompleted]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer) {
            setUserAnswers(prevAnswers => [...prevAnswers, { questionIndex: currentQuestionIndex, answer: selectedAnswer }]);
            if (currentQuestionIndex < quizzes.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setTimeRemaining(60);  // Reset timer for the next question
                setSelectedAnswer(null);  // Clear the previous selection
            } else {
                setQuizCompleted(true);
                setSuccess('Quiz completed! Reviewing results...');
                // You can process results here or send them to an API
                processResults();
            }
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setTimeRemaining(60);  // Reset timer for the previous question
            setSelectedAnswer(userAnswers.find(answer => answer.questionIndex === currentQuestionIndex)?.answer || null);
        }
    };

    const processResults = () => {
        // Here you can calculate results based on userAnswers and quizzes
        // For now, we'll just log it
        const results = quizzes.map((quiz, index) => ({
            question: quiz.question,
            userAnswer: userAnswers.find(answer => answer.questionIndex === index)?.answer,
            correctAnswer: quiz.correctAnswer
        }));
        console.log('Quiz Results:', results);
        // You can also send results to an API or store them in state
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (quizzes.length === 0) {
        return <div>No quiz data available</div>;
    }

    const currentQuiz = quizzes[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h2>Quiz</h2>
            <p>Time remaining: {timeRemaining} seconds</p>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{currentQuiz.question}</p>

            <div className="answers">
                {currentQuiz.answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelection(answer)}
                        className={selectedAnswer === answer ? 'selected' : ''}
                        disabled={quizCompleted}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            <div className="navigation-buttons">
                <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0 || quizCompleted}>
                    Prev
                </button>
                <button onClick={handleNextQuestion} disabled={timeRemaining === 0 || !selectedAnswer || quizCompleted}>
                    {currentQuestionIndex === quizzes.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>

            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default QuizPage;
