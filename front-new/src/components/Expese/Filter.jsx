import {React, useState} from 'react';
import '../../assets/styles/Expense.css';

function Filter() {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const handleFilterClick = (filter) => setSelectedFilter(filter);

    return (
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
    );
}

export default Filter;
