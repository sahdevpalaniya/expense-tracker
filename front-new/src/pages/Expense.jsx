import React, { useState, useEffect } from 'react';
import Filter from '../components/Expese/Filter';
import Summary from '../components/Expese/Summary';
import { faMoneyBillWave, faChartLine, faWallet } from '@fortawesome/free-solid-svg-icons';
import List from '../components/Expese/List';
import '../assets/styles/Expense.css';
import axios from 'axios';
import ActionButton from '../components/Expese/ActionButton';

const Expense = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalRemaining, setTotalRemaining] = useState(0);
    const [data, setData] = useState('All');

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/expense?type=${selectedFilter}`);
                console.log("response",response);
                setData(response.data.data.expenses);
                setTotalIncome(response.data.data.totalIncome);
                setTotalExpense(response.data.data.totalExpense);
                setTotalRemaining(response.data.data.totalAmount);
            } catch (err) {
                console.log("Error fetching expenses:", err);
            }
        };
        fetchExpenses();
    }, [selectedFilter]);

    const handleFilterClick = (filter) => setSelectedFilter(filter);
    return (
        <div className="main-container">
            <div className="main-card">
                <h2>Expese</h2>
                <Filter selectedFilter={selectedFilter} event={handleFilterClick} />
                <div className="summary-grid">
                    <Summary icon={faMoneyBillWave} title='Income' totalExpense={totalIncome} extraClass="income" />
                    <Summary icon={faChartLine} title='Expense' totalExpense={totalExpense} extraClass="expense" />
                    <Summary icon={faWallet} title='Remaining' totalExpense={totalRemaining} extraClass="remaining" />
                </div>
                <List data={data} />
                <div className="action-buttons">
                    <ActionButton extraClass="cash-in" buttonLable="Cash In" />
                    <ActionButton extraClass="cash-out" buttonLable="Cash Out" />
                </div>
            </div>
        </div>
    );
};

export default Expense;