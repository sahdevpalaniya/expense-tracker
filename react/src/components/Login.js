import React, { useState, useEffect } from 'react';
import './css/login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../helpers/Response';
import { useAlert } from './context/AlertContext';

const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    await axios.post(`${process.env.REACT_APP_APP_URL}/login`, loginFormData)
      .then(response => {
        const accessToken = response.data.data.access_token;
        const userId = response.data.data.user._id;
        const username = response.data.data.user.name;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('name', username);
        setLoginFormData({
          username: '',
          password: ''
        });
        showAlert(response.data?.message, response.data?.status === false ? 'error' : 'success' || "error");
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate('/expense');
          window.location.reload();
        }, 1000);
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
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              value={loginFormData.username}
              onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
              required
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={loginFormData.password}
              onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="remember"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="footer-links">
          <a href="#">Forgot Password?</a> |<Link to={'/register'} className=""> Sign Up </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;