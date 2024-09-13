// src/components/QuizSet.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import './QuizSet.css';
import {useNavigate, useParams} from "react-router-dom"; // Ensure this path is correct

function QuizSet() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { subjectName, lessonName,quizes } = useParams();
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                // Replace with the actual endpoint URL
                const response = await axios.get('http://localhost:8085/api/quizzes/bySubjectAndLesson/Science/Geometry');
                // Map API data to match NoteCard's expected format
                const quizData = response.data.map(quiz => ({ name: quiz.quiz_set })); // Rename quiz_set to name
                setQuizzes(quizData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch quizzes');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const clickQuizSet = (quiz) => {
        navigate(`/${subjectName}/${lessonName}/${quizes}/${quiz}`);
    };
    return (
        <div className="quiz-set-container">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {quizzes.map((quiz, index) => (
                <NoteCard
                    key={index}
                    note={quiz} // NoteCard expects note to have a name field
                    onClick={() => clickQuizSet(quiz)}                />
            ))}
        </div>
    );
}

export default QuizSet;
