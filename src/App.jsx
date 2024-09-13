// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SubjectDashboard from './pages/SubjectDashboard';
import OlSubjectDashboard from './pages/OlSubjectDashboard';
import LessonsDashboard from './pages/LessonsDashboard';
import SubjectCategory from './pages/SubjectCategory';
import QuizPage from './pages/QuizPage';
import PdfViewer from './components/PdfViewer';
import WeekMotivations from './pages/WeekMotivations';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Admin from './pages/Admin';
import QuizSet from "./pages/QuizSet.jsx";
import Games from "./pages/Games.jsx";

function App() {


    return (
 <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home/AL" element={<SubjectDashboard />} />
                <Route path="/home/OL" element={<OlSubjectDashboard />} />
                <Route path="/home/Week-Motivations" element={<WeekMotivations />} />
                <Route path="/:subjectName" element={<LessonsDashboard />} />
                <Route path="/:subjectName/:lessonName" element={<SubjectCategory />} />
                <Route path="/:subjectName/:lessonName/quizes" element={<QuizSet />} />
                <Route path="/:subjectName/:lessonName/notes" element={<PdfViewer />} />
                <Route path="/:subjectName/:lessonName/:quizes/:quizName" element={<QuizPage />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<Terms />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/game" element={<Games />} />
            </Routes>
        </Router>
    );
}

export default App;
