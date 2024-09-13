import React from 'react';
import './OlSubjectDashboard.css';
import { FaFlask, FaAtom, FaCalculator } from 'react-icons/fa';
import SubjectCard from "../components/SubjectCard";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { useNavigate} from "react-router-dom";

const subjects =[
    {name: 'Science', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'Mathematics', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'Buddhism', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'Sinhala', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'ICT', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'History', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'Literature', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'commerce', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
    {name: 'English', details:'Quiz, All Papers,Notes' ,icon:<FaFlask/>,color:'blue' },
];


function OlSubjectDashboard() {
    const navigate = useNavigate();
    const handleSubjectClick = (subject) => {
        navigate(`/${subject.name}`);
    };

    return (
        <div className="container-ol-dashboard">
            <Navbar/>
            <div className="subjects-ol">
                {subjects.map((subject, index) => (
                    <SubjectCard key={index} subject={subject}
                    onClick={() => handleSubjectClick(subject)}
                    />
                ))}
            </div>
            <div className="footer-ol">
                <Footer />
            </div>
        </div>
    )
}
export default OlSubjectDashboard;