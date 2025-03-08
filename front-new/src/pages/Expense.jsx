import React, { useState } from 'react';
import Filter from '../components/Expese/Filter';

const Expense = () => {
    return (
        <div className="main-container">
            <div className="main-card">
                <h2>Expese</h2>
                <Filter />
            </div>
        </div>
    );
};

export default Expense;