import React from 'react';
import './FirstLoading.css';  // Import the CSS file
import logo from '../assets/logo.png';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}

export default LoadingScreen;
