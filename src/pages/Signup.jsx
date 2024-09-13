import React from 'react';
import './SignUp.css';

import email from '../assets/email.png';
import password from '../assets/password.png';
import eye from '../assets/eye.png';
import logo from '../assets/logo.png';

function Signup() {
  return (

          <div className="container-Signup">
              <div className="logoContainer">
                  <img src={logo} alt="logo"/>
              </div>
              <div className="input">
                  <img src={email} alt="Email"/>
                  <input type="email" placeholder="Email Address"/>
              </div>
              <div className="input">
                  <img src={password} alt="Password"/>
                  <input className="password" type="password" placeholder="Password"/>
                  <img src={eye} alt="Show/Hide Password"/>
              </div>
              <div className="input">
                  <img src={password} alt="Password"/>
                  <input type="password" placeholder="Confirm Password"/>
                  <img src={eye} alt="Show/Hide Password"/>
              </div>
              <button className="loginButton">Sign Up</button>
              <div className="signup">
                  <span>Already have an account? <a href="/Log In">Login In</a></span>
              </div>
              <div className="terms">
        <span>
         By Signing Up/Logging in, You agree to our{' '}
            <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
        </span>
              </div>
          </div>

          );
          }

          export default Signup;
