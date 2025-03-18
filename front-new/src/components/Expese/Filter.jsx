import { React, useState } from 'react';
import './Filter.css';

function Filter({ selectedFilter, event }) {
    
    const handleClick = (filter) => {
        event(filter);
    };

    return (
        <div className="filter-box">
            {['All', 'Daily', 'Monthly', 'Yearly'].map((filter) => (
                <button
                    key={filter}
                    className={`filter-btn ${selectedFilter === filter ? 'selected' : ''}`}
                    onClick={() => handleClick(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}

export default Filter;
