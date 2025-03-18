import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
      const username = localStorage.getItem('name');
      if (username) {
        setUserInitial(username.charAt(0).toUpperCase());
      }
    } else {
      setIsLoggedIn(false);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    navigate('/login')
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="app-name">
          Expense Tracker
        </Link>
        <div className="header-right">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="auth-link">
                Sign Up
              </Link>
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </>
          ) : (
            <div className="user-profile">
              <div className="profile-circle" onClick={toggleDropdown}>
                {userInitial}
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                  <a onClick={handleLogout} className="dropdown-item">
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;