import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import home from '../assets/home.png';
import profile from '../assets/profile.png';
import game from '../assets/game.png';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import setting from '../assets/setting.png';
import logo from '../assets/logo.png';

function Navbar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    const headerClick= (icon) => {
        // Navigate based on the provided path
        if (icon === '/home') {
            navigate('/home');
        } else if (icon === '/game') {
            navigate('/game');
        } else if (icon === '/profile') {
            navigate('/profile');
        }
    };
    return (
        <div className="navbar">
            <ul className="left-conor">
                <li>
                    <img src={logo} alt="logo Icon" className="icon" />
                </li>
                <li onClick={() => handleNavigation('/home')}>
                    <img src={home} alt="Home Icon" className="icon" />
                </li>
                <li onClick={() => headerClick('/game')}>
                    <img src={game} alt="game Icon" className="icon" />
                </li>
            </ul>
            <ul className="right-conor">
                <li onClick={() => headerClick('/profile')}>
                    <img src={profile} alt="Profile Icon" className="icon" />
                </li>
                <li>
                    <img src={sun} alt="Sun Icon" className="icon" />
                    <img src={moon} alt="Moon Icon" className="icon" />
                </li>
                <li onClick={() => headerClick('/settings')}>
                    <img src={setting} alt="Settings Icon" className="icon" />
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
