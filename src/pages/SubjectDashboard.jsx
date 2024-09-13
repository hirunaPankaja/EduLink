import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectDashboard.css';
import { FaFlask, FaAtom, FaCalculator, FaLaptopCode, FaMicrochip } from 'react-icons/fa';
import SubjectCard from '../components/SubjectCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const subjects = [
    { name: 'Biology', details: 'Quiz, All Papers, Notes', icon: <FaFlask />, color: 'green' },
    { name: 'Chemistry', details: 'Quiz, All Papers, Notes', icon: <FaMicrochip />, color: 'brown' },
    { name: 'Physics', details: 'Quiz, All Papers, Notes', icon: <FaAtom />, color: 'blue' },
    { name: 'Combine Maths', details: 'Quiz, All Papers, Notes', icon: <FaCalculator />, color: 'orange' },
    { name: 'ICT', details: 'Quiz, All Papers, Notes', icon: <FaLaptopCode />, color: 'purple' },
];

function SubjectDashboard() {
    const navigate = useNavigate();

    const handleSubjectClick = (subject) => {
        navigate(`/${subject.name}`);
    };

    return (
        <>
            <Navbar />
            <div className="container-dashboard">
                <div className="subjects-dashboard">
                    <h1>Subjects</h1>
                    {subjects.map((subject, index) => (
                        <SubjectCard
                            key={index}
                            subject={subject}
                            onClick={() => handleSubjectClick(subject)}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default SubjectDashboard;
