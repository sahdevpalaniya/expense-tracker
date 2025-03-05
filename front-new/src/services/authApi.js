import axios from 'axios';

// Login function using axios
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/login`, credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

// Register function using axios
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/register`, userData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};