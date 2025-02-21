// src/components/Login.js
import React, { useState } from 'react';
import './css/login.css';

const Login = () => {
  // State hooks to manage form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic (e.g., API call)
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
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
          <a href="#">Forgot Password?</a> | <a href="#">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;