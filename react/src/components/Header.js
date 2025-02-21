import React, { useState } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import './css/header.css';
import axios from 'axios';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const formData = {
        username:'',
        password:'',
    }
    const handleLoginClick = () => {
        axios.post(`${process.env.APP_URL}/login`,loginData)
            .then(response => {
                setUser(response.data);
                setIsLoggedIn(true);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };

    const handleProfileClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="app-name">MyApp</div>

                <div className="user-profile" onClick={isLoggedIn ? handleProfileClick : handleLoginClick}>
                    {isLoggedIn ? (
                        <div className="profile">
                            <div className="profile-pic">
                                {user.name[0]}
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
