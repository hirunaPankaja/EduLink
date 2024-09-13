// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';
import al from '../assets/al.jpeg';
import ol from '../assets/ol.jpeg';
import motivation from '../assets/motivation.jpeg';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Add class to disable scrolling
        document.body.style.overflow = 'hidden';

        // Cleanup: remove class when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const navigateToPage = (pageName) => {
        // Navigate based on the page name
        switch (pageName) {
            case 'Ordinary Level':
                navigate('/home/OL'); // Adjust path as needed
                break;
            case 'Advanced Level':
                navigate('/home/AL'); // Adjust path as needed
                break;
            case 'Week Motivation':
                navigate('/home/Week-Motivations'); // Adjust path as needed
                break;
            default:
                console.error('Unknown page:', pageName);
        }
    };

    return (
        <div className="home-container">
            <Navbar />

            <div className="home-page">
                <section className="services">
                    <div
                        className="service"
                        onClick={() => navigateToPage('Ordinary Level')}
                    >
                        <img src={ol} alt="Ordinary Level" />
                        <h3>Ordinary Level</h3>
                    </div>
                    <div
                        className="service"
                        onClick={() => navigateToPage('Advanced Level')}
                    >
                        <img src={al} alt="Advanced Level" />
                        <h3>Advanced Level</h3>
                    </div>
                    <div
                        className="service"
                        onClick={() => navigateToPage('Week Motivation')}
                    >
                        <img src={motivation} alt="Week Motivation" />
                        <h3>Week Motivation</h3>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
