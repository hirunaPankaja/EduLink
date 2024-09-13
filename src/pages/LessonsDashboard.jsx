import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LessonDashboard.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NoteCard from '../components/NoteCard';

function LessonsDashboard() {
    const { subjectName } = useParams();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:8089/api/files/lessons/${subjectName}`);
                setLessons(response.data);
            } catch (err) {
                setError('Failed to fetch lessons');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [subjectName]);

    const handleLessonClick = (lesson) => {
        navigate(`/${subjectName}/${lesson}`); // Pass both subjectName and lessonName to the SubjectCategory route
    };

    return (
        <>
            <Navbar />
            <div className="lessons-dashboard">
                <h2>Lessons for {subjectName}</h2>

                {loading && <p>Loading lessons...</p>}
                {error && <p className="error">{error}</p>}
                <div className="notes-container">
                    {lessons.map((lesson, index) => (
                        <NoteCard
                            key={index}
                            note={{ name: lesson }}
                            onClick={() => handleLessonClick(lesson)}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LessonsDashboard;
