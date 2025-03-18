import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Summary.css';

function Summary({ icon, title, totalExpense, extraClass }) {
    return (
        <>
            <div className="summary-item">
                <div className="icon-bracket">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className="summary-info">
                    <span className="summary-title">{title}</span>
                    <span className={extraClass + ' amount'}>₹{totalExpense}</span>
                </div>
            </div >
        </>
    )
}

export default Summary