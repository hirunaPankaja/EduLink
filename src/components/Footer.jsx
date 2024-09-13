import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import social media icons

function Footer({ onShowModal }) {
    const navigate = useNavigate();

    const footerClick= (path) => {
        // Navigate based on the provided path
        if (path === '/privacy-policy') {
            navigate('/privacy-policy');
        } else if (path === '/terms-&-conditions') {
            navigate('/terms-&-conditions');
        } else if (path === '/contact-us') {
            navigate('/contact-us');
        } else {
            console.error('Unknown path:', path);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 MyApp. All rights reserved.</p>
                <ul className="footer-links">
                    <li onClick={() => footerClick('/privacy-policy')}>Privacy Policy</li>
                    <li onClick={() => footerClick('/terms-&-conditions')}>Terms of Service</li>
                    <li onClick={() => footerClick('/contact-us')}>Contact Us</li>
                </ul>
                <div className="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
