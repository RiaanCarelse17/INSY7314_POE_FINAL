import React, { useState } from 'react';
import axios from 'axios';
import './RegisterScreen.css';

const RegisterScreen = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    username: '',
    password: '',
    accountNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Creating profile:', formData);

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      alert('✅ Successfully signed up!');
      onBack(); // Navigate to login screen
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Profile details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
          <div className="button-group">
            <button type="submit" className="create-btn">Create Profile</button>
            <button type="button" className="back-btn" onClick={onBack}>Back</button>
          </div>
        </form>
        <div className="contact-link">
          📞 <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;