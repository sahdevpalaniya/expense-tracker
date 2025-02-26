import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/addExpense.css'; // Import the new CSS file
import axios from 'axios';

const AddExpense = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialType = query.get('type') === '0' ? '0' : '1';
    const expenseId = query.get('id');
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    const [type, setType] = useState(initialType);
    const [isEditing, setIsEditing] = useState(false);

    const [inputs, setInputs] = useState({
        user_id: localStorage.getItem('user_id'),
        type: type,
        amount: "",
        category: "",
        expense_date: "",
        description: ""
    });

    useEffect(() => {
        if (expenseId != null) {
            setIsEditing(true);
            const fetchedExpenseData = {
                amount: "100",
                category: "Food",
                expense_date: "2025-02-26",
                description: "Dinner expense"
            };
            setInputs(prevInputs => ({
                ...prevInputs,
                ...fetchedExpenseData
            }));
        } else {
            setIsEditing(false);
            setInputs(prevInputs => ({
                ...prevInputs,
                type: type,
                amount: "",
                category: "",
                expense_date: "",
                description: ""
            }));
        }

        setInputs(prevInputs => ({
            ...prevInputs,
            type: type
        }));

    }, [expenseId, type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_APP_URL}/expense`, inputs).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log("Submit form error :" + err);
        })
        resetForm();
    };
    const handleInputs = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleDelete = () => {
        console.log('Expense deleted');
        resetForm();
    };

    const resetForm = () => {
        setInputs({
            user_id: localStorage.getItem('user_id'),
            type: type,
            amount: "",
            category: "",
            expense_date: "",
            description: ""
        });
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
                    <div className="textbox">
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={inputs.amount}
                            onChange={handleInputs}
                            className="amount-input"
                            style={{ color: type === '0' ? 'green' : 'red', fontWeight: "bolder" }}
                        />
                    </div>
                    <div className="textbox">
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={inputs.category}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="textbox">
                        <input
                            type="date"
                            name="expense_date"
                            value={inputs.expense_date}
                            onChange={handleInputs}
                        />
                    </div>
                    <div className="textbox">
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={inputs.description}
                            onChange={handleInputs}
                        />
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
