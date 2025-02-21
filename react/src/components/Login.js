// src/components/Login.js
import React, { useState } from 'react';
import './css/login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  // State hooks to manage form values
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.APP_URL}/login`)
      .then(response => {
        setUser(response.data);
        setIsLoggedIn(true);
      })
      .catch(err => {

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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