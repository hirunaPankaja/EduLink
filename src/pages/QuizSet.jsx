// src/components/QuizSet.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import './QuizSet.css';
import { useNavigate, useParams } from 'react-router-dom';

function QuizSet() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { subjectName, lessonName } = useParams(); // Get route parameters

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                // Fetch quizzes for a specific subject and lesson
                const response = await axios.get(`http://localhost:8085/api/quizzes/Quizets/${subjectName}/${lessonName}`);
                console.log('API Response:', response.data);

                // Remove duplicates based on quiz name
                const uniqueQuizzes = Array.from(
                    new Map(response.data.map(quiz => [quiz, quiz])).values()
                );

                setQuizzes(uniqueQuizzes); // Set unique quizzes
            } catch (err) {
                setError('Failed to fetch quizzes');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [subjectName, lessonName]);

    const clickQuizSet = (quizName) => {
        // Use the quiz name directly for the navigation path
        navigate(`/${subjectName}/${lessonName}/quizzes/${quizName}`);
    };

    return (
        <div className="quiz-set-container">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                    <NoteCard
                        key={index}
                        note={{ name: quiz }}
                        onClick={() => clickQuizSet(quiz)}
                    />
                ))
            ) : (
                <p>No quizzes available</p>
            )}
        </div>
    );
}

export default QuizSet;
