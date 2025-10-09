import React from 'react';
import './HomeScreen.css';

const HomeScreen = ({ fullName, accountData, onSignOut }) => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <span className="nav-title">Welcome, {fullName}</span>
        <div className="nav-links">
          <button>Home</button>
          <button>Make Payment</button>
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      </nav>

      <div className="account-summary">
        <h2>Your Accounts</h2>
        <div className="account-card daily">
          <h3>Daily Account</h3>
          <p>Balance: R{accountData.daily}</p>
        </div>
        <div className="account-card savings">
          <h3>Savings</h3>
          <p>Balance: R{accountData.savings}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;