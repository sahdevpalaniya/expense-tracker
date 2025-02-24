import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/addExpense.css'; // Import the new CSS file

const AddExpense = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialType = query.get('type') === '0' ? '0' : '1';
    const expenseId = query.get('id');

    const [type, setType] = useState(initialType);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (expenseId != null) {
            setIsEditing(true);
        }
    }, [expenseId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Expense submitted:', { type, amount, category, date, description });
        resetForm();
    };

    const handleEdit = () => {
        console.log('Expense edited:', { type, amount, category, date, description });
        resetForm();
        setIsEditing(false);
    };

    const handleDelete = () => {
        console.log('Expense deleted');
        resetForm();
    };

    const resetForm = () => {
        setAmount('');
        setCategory('');
        setDate('');
        setDescription(''); // Reset description
    };

    return (
        <div className="add-expense-container">
            <div className="add-expense-box">
                <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
                <div className="filter-type">
                    <div
                        className={`badge cash-in ${type === '0' ? 'active' : ''}`}
                        onClick={() => setType('0')}
                    >
                        Cash In
                    </div>
                    <div
                        className={`badge cash-out ${type === '1' ? 'active' : ''}`}
                        onClick={() => setType('1')}
                    >
                        Cash Out
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ color: type === '0' ? 'green' : 'red' }}>
                        <div className="textbox">
                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="amount-input"
                                style={{ color: type === '0' ? 'green' : 'red', fontWeight: "bolder" }}
                            />
                        </div>
                        <div className="textbox">
                            <input
                                type="text"
                                placeholder="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="textbox">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="textbox">
                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn submit" >
                            {isEditing ? 'Update' : 'Submit'}
                        </button>
                        <Link
                            type="button"
                            className="btn cancel"
                            to="/expense"
                            style={{ backgroundColor: 'rgb(102, 101, 99)' }}
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
