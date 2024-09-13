import React from 'react';
import './Login.css';

import email from '../assets/email.png';
import password from '../assets/password.png';
import eye from '../assets/eye.png';
import logo from '../assets/logo.png';
import google from '../assets/google.png';
import phone from '../assets/phone.png';

function Login() {
  return (
    <div className="container-login">
      <div className="logoContainer">
        <img src={logo} alt="Logo" />
      </div>
      <div className="input">
        <img src={email} alt="Email" />
        <input type="email" placeholder="Email Address" />
      </div>
      <div className="input">
        <img src={password} alt="Password" />
        <input type="password" placeholder="Password" />
        <img src={eye} alt="Show/Hide Password" />
      </div>
      <div className="forgotPassword">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <button className="loginButton">Log In</button>
      <div className="signup">
        <span>Don't have an account? <a href="/signup">Sign Up</a></span>
      </div>
      <div className="or">OR</div>
      <div className="socialLogin">
        <img src={google} alt="Google Login" />
        <img src={phone} alt="Phone Login" />
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

export default Login;
