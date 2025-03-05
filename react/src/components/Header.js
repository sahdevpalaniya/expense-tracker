import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './css/header.css';
import axios from 'axios';
import { useAlert } from './context/AlertContext';
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showAlert } = useAlert();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setUser({
            name: localStorage.getItem('name'),
            user_id: localStorage.getItem('user_id'),
            token: localStorage.getItem('access_token'),
        });
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);


    axios.defaults.headers.common['Authorization'] = user?.token;
    const handleProfileClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = async () => {
        await axios.post(`${process.env.REACT_APP_APP_URL}/logout`).then(async (response) => {
            localStorage.clear();
            setIsLoggedIn(false);
            showAlert(response.data?.message, response.data?.status == false ? 'error' : 'success' || "error");
        }).catch(async err => {
            showAlert(err.response?.data?.message, err.response?.data?.status == false ? 'error' : 'success' || "error");
        });
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="app-name">MyApp</div>

                <div className="user-profile">
                    {isLoggedIn ? (
                        <div className="profile" onClick={handleProfileClick}>
                            <div className="profile-pic">
                                {user?.name ? user.name[0] : 'U'}
                            </div>
                            {showMenu && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li> Dashboard</li>
                                        <li onClick={handleLogout}>Logout</li>
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