import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './SubjectCategory.css';
import { FaQuestionCircle, FaStickyNote } from "react-icons/fa";
import SubjectCard from "../components/SubjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const subjects = [
    { name: 'Quiz', details: 'Quiz for Subject ', icon: <FaQuestionCircle />, color: 'green' },
    { name: 'Notes', details: 'Notes', icon: <FaStickyNote />, color: 'brown' },
];

function SubjectCategory() {
    const { subjectName, lessonName } = useParams(); // Destructure both parameters
    const navigate = useNavigate();

    const handleCardClick = (subject) => {
        if (subject.name === 'Quiz') {
            navigate(`/${subjectName}/${lessonName}/quizes`); // navigate to the quiz page
        }
        if (subject.name === 'Notes') {
            navigate(`/${subjectName}/${lessonName}/notes`);// navigate to Note page
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-category">
                <div className="subject-details">
                    <h2>Lesson Details: {lessonName}</h2>
                    <p>Subject: {subjectName}</p> {/* Display subject name */}
                </div>
                <div className="subjects">
                    {subjects.map((subject, index) => (
                        <SubjectCard
                            key={index}
                            subject={subject}
                            onClick={() => handleCardClick(subject)} // Corrected from `quiz` to `subject`
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SubjectCategory;
