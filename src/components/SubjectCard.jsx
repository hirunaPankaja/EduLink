import React from 'react';
import './SubjectCard.css';

function SubjectCard({ subject, onClick }) {
    return (
        <div className="subject-card" onClick={onClick} role="button" tabIndex={0}>
            <div className="subject-icon" style={{ color: subject.color }}>
                {subject.icon}
            </div>
            <div className="subject-info">
                <h3>{subject.name}</h3>
                <p>{subject.details}</p>
            </div>
        </div>
    );
}

export default SubjectCard;
