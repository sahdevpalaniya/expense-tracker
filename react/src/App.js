import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseTracker from './components/ExpenseTracker';
import '../src/components/css/app.css';
import { AlertProvider } from './components/context/AlertContext';
import Alert from './components/Alert';
import AddExpense from './components/AddExpense';

const App = () => {
  const isAuthenticated = localStorage.getItem('access_token');

  return (
    <Router>
      <AlertProvider>
        <Alert />
        <Header />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/expense" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/expense" /> : <Register />} />
          <Route path="/expense" element={isAuthenticated ? <ExpenseTracker /> : <Navigate to="/" />} />
          <Route path="/add-expense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </AlertProvider>
    </Router>
  );
};

export default App;