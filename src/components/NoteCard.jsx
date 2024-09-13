// src/components/NoteCard.js

import React from 'react';
import './NoteCard.css';

function NoteCard({ note, onClick }) {
    return (
        <div className="note-card" onClick={onClick} role="button" tabIndex={0}>
            <div className="note-info">
                <h3>{note.name}</h3> {/* Display the quiz set name */}
            </div>
        </div>
    );
}

export default NoteCard;
