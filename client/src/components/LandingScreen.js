// client/src/components/LandingScreen.js
import React from 'react';
import './LandingScreen.css'; // We'll style it separately

const LandingScreen = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to the internet banking portal</h1>
        <p className="warning-text">Please register if you do not have an account.</p>
        <div className="button-group">
          <button className="register-btn" onClick={onRegisterClick}>Register Now</button>
          <button className="login-btn" onClick={onLoginClick}>Login</button>
        </div>
        <div className="contact-link">
          📞 <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;