// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/register.css';
import { handleError } from '../helpers/Response';
import { useAlert } from './context/AlertContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_APP_URL}/register`, registerFormData)
            .then(response => {
                showAlert(response.data?.message, response.data?.status === false ? 'error' : 'success' || "error");
                setRegisterFormData({
                    name: '',
                    email: '',
                    username: '',
                    password: '',
                });
                navigate('/');
            })
            .catch(async err => {
                if (err.response && err.response.data.status === "error") {
                    setErrors(await handleError(err));
                } else {
                    showAlert(err.response?.data?.message, err.response?.data?.status === false ? 'error' : 'success' || "error");
                }
            });
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input
                            type="text"
                            placeholder="Name"
                            value={registerFormData.name}
                            onChange={(e) => setRegisterFormData({ ...registerFormData, name: e.target.value })}
                            required
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}

                    </div>
                    <div className="textbox">
                        <input
                            type="email"
                            placeholder="Email"
                            value={registerFormData.email}
                            onChange={(e) => setRegisterFormData({ ...registerFormData, email: e.target.value })}
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}

                    </div>
                    <div className="textbox">
                        <input
                            type="text"
                            placeholder="Username"
                            value={registerFormData.username}
                            onChange={(e) => setRegisterFormData({ ...registerFormData, username: e.target.value })}
                            required
                        />
                        {errors.username && <p className="error-message">{errors.username}</p>}

                    </div>
                    <div className="textbox">
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerFormData.password}
                            onChange={(e) => setRegisterFormData({ ...registerFormData, password: e.target.value })}
                            required
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}

                    </div>
                    <button type="submit" className="btn">Register</button>
                </form>
                <div className="footer-links">
                    <Link to={'/'} className="login-btn">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;