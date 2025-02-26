import React, { useState, useEffect } from 'react';
import './css/expenseTracker.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseTracker = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [expenses, setExpenses] = useState([]);  // State to store expenses
    const navigate = useNavigate();

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_APP_URL}/expense?type=${selectedFilter}`);
                const fetchedExpenses = response.data.data.expenses;
                setExpenses(fetchedExpenses);

                setTotalIncome(response.data.data.totalIncome);
                setTotalExpense(response.data.data.totalExpense);
                setRemaining(response.data.data.totalAmount);
            } catch (err) {
                console.log("Error fetching expenses:", err);
            }
        };

        fetchExpenses();
    }, [selectedFilter]);

    const handleCashInClick = () => {
        navigate('/add-expense?type=0');
    };

    const handleCashOutClick = () => {
        navigate('/add-expense?type=1');
    };

    return (
        <>
            <div className="advertisement-banner">
                <p>Exclusive Offer! Get 20% off your next purchase.</p>
            </div>
            <div className="expense-container">
                <div className="expense-box">
                    <div className="filter-box">
                        <ul className="filter-list">
                            {['All', 'Daily', 'Monthly', 'Yearly'].map((filter) => (
                                <li
                                    key={filter}
                                    className={selectedFilter === filter ? 'selected' : ''}
                                    onClick={() => handleFilterClick(filter)}
                                >
                                    {filter}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="expense-list">
                            {expenses.map((expense, index) => (
                                <div
                                    key={expense._id}
                                    className="expense-item grid"
                                    onClick={() => navigate(`/add-expense?id=${expense.id}&type=${expense.type}`)}
                                >
                                    <span className="description">{expense.description} ({expense.category})</span>
                                    <span className={expense.type === "1" ? 'amount expense' : 'amount income'}>
                                        ₹{expense.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="amount-details">
                            <div className="totalIncome">
                                <p>Income</p>
                                <span className="amount income">₹{totalIncome}</span>
                            </div>
                            <div className="totalExpense">
                                <p>Expense</p>
                                <span className="amount expense">₹{totalExpense}</span>
                            </div>
                            <div className="totalRemaining">
                                <p>Remaining</p>
                                <span className="amount remaining">₹{remaining}</span>
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="cash-button cash-in" onClick={handleCashInClick}>Cash In</button>
                            <button className="cash-button cash-out" onClick={handleCashOutClick}>Cash Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExpenseTracker;