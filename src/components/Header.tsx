import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-symbol">⚡</div>
        <h1 className="logo-text">AI Code Optimizer</h1>
      </div>
      <div className="header-decoration">
        <div className="rangoli-pattern"></div>
      </div>
      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;