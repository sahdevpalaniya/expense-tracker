import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import './css/header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // Initialize as null, as it might not exist yet.
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    // Check if the user is logged in
    useEffect(() => {
        if (localStorage.getItem('token') !== undefined) {
            setIsLoggedIn(true);
        }

        // Get the user from localStorage and parse it if it exists
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData)); // Parse the user object
        }
    }, []);

    const handleProfileClick = () => {
        setShowMenu(!showMenu);
    };
    console.log(isLoggedIn)
    return (
        <div className="app">
            <header className="header">
                <div className="app-name">MyApp</div>

                <div className="user-profile">
                    {!isLoggedIn ? (
                        <div className="profile">
                            <div className="profile-pic">
                                {user?.name ? user.name[0] : 'U'}
                            </div>
                            {showMenu && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li>Profile</li>
                                        <li>Settings</li>
                                        <li>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        location.pathname === '/' ? (
                            <Link to={'/register'} className="login-btn">
                                Sign Up
                            </Link>
                        ) : location.pathname === '/register' ? (
                            <Link to={'/'} className="login-btn">
                                Login
                            </Link>
                        ) : ''
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;