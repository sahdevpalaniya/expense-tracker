import React, { useState, useEffect } from 'react';
import './css/expenseTracker.css';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const navigate = useNavigate();

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    const expenses = [
        { id: 1, description: 'Groceries', amount: 50, type: 1, category: 'Food' },
        { id: 2, description: 'Utilities', amount: 100, type: 1, category: 'Bills' },
        { id: 3, description: 'Rent', amount: 1200, type: 1, category: 'Housing' },
        { id: 4, description: 'Transportation', amount: 30, type: 1, category: 'Transport' },
        { id: 5, description: 'Entertainment', amount: 60, type: 1, category: 'Leisure' },
        { id: 6, description: 'Dining Out', amount: 40, type: 1, category: 'Food' },
        { id: 7, description: 'Internet', amount: 50, type: 1, category: 'Bills' },
        { id: 8, description: 'Gym Membership', amount: 30, type: 1, category: 'Health' },
        { id: 9, description: 'Insurance', amount: 200, type: 1, category: 'Bills' },
        { id: 10, description: 'Miscellaneous', amount: 20, type: 1, category: 'Other' },
        { id: 11, description: 'Salary', amount: 1500, type: 0, category: 'Income' },
        { id: 12, description: 'Freelance Work', amount: 300, type: 0, category: 'Income' },
    ];

    useEffect(() => {
        const income = expenses.filter(expense => expense.type === 0).reduce((acc, curr) => acc + curr.amount, 0);
        const expense = expenses.filter(expense => expense.type === 1).reduce((acc, curr) => acc + curr.amount, 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setRemaining(income - expense);
    }, [expenses]);

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
                                <div key={expense.id} className="expense-item grid" onClick={() => navigate(`/add-expense?id=${expense.id}&type=${expense.type}`)}>
                                    <span className="description">{index + 1}. {expense.description} ({expense.category})</span>
                                    <span className={expense.type === 1 ? 'amount expense' : 'amount income'}>
                                        ₹{expense.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className='amount-details'>
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