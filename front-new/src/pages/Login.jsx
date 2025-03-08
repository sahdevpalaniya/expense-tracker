import React, { useState } from 'react';
import Input from '../components/common/Input';
import { loginUser } from '../services/authApi';
import '../assets/styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
 
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginUser(formData);
            if (response.status == true) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('name', response.data.user.username);
                localStorage.setItem('user_id', response.data.user.id);
                navigate('/dashboard');
            }
            console.log('Login successful:', response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <div className="main-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <Button type="submit" loading={loading} value="Login" />
                </form>
            </div>
        </div>
    );
};

export default Login;