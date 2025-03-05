import React, { useState, useEffect } from 'react';
import './css/expenseTracker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faChartLine, faWallet } from '@fortawesome/free-solid-svg-icons';

const ExpenseTracker = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_APP_URL}/expense?type=${selectedFilter}`);
                setExpenses(response.data.data.expenses);
                setTotalIncome(response.data.data.totalIncome);
                setTotalExpense(response.data.data.totalExpense);
                setRemaining(response.data.data.totalAmount);
            } catch (err) {
                console.log("Error fetching expenses:", err);
            }
        };
        fetchExpenses();
    }, [selectedFilter]);

    const handleFilterClick = (filter) => setSelectedFilter(filter);
    const handleCashInClick = () => navigate('/add-expense?type=0');
    const handleCashOutClick = () => navigate('/add-expense?type=1');

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Expense Tracker</h2>

                {/* Summary Section */}
                <div className="summary-grid">
                    <div className="summary-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faMoneyBillWave} />
                        </div>
                        <div className="summary-info">
                            <span className="summary-title">Income</span>
                            <span className="amount income">₹{totalIncome}</span>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <div className="summary-info">
                            <span className="summary-title">Expense</span>
                            <span className="amount expense">₹{totalExpense}</span>
                        </div>
                    </div>
                    <div className="summary-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faWallet} />
                        </div>
                        <div className="summary-info">
                            <span className="summary-title">Remaining</span>
                            <span className="amount remaining">₹{remaining}</span>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="filter-box">
                    {['All', 'Daily', 'Monthly', 'Yearly'].map((filter) => (
                        <button
                            key={filter}
                            className={`filter-btn ${selectedFilter === filter ? 'selected' : ''}`}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Expenses List */}
                <div className="expense-list">
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <div
                                key={expense._id}
                                className="expense-item"
                                onClick={() => navigate(`/add-expense?id=${expense._id}&type=${expense.type}`)}
                            >
                                <div className="expense-info">
                                    <span className="description">{expense.description}</span>
                                    <span className="category">({expense.category})</span>
                                </div>
                                <span className={`amount ${expense.type === "1" ? 'expense' : 'income'}`}>
                                    ₹{expense.amount}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="no-expenses">No expenses recorded</div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="action-btn cash-in" onClick={handleCashInClick}>
                        <FontAwesomeIcon icon={faMoneyBillWave} /> Cash In
                    </button>
                    <button className="action-btn cash-out" onClick={handleCashOutClick}>
                        <FontAwesomeIcon icon={faMoneyBillWave} /> Cash Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;