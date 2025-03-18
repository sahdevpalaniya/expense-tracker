import React from 'react'
import './ActionButton.css';

function ActionButton({ event, buttonLable, extraClass }) {
    return (
        <button className={"action-btn " + extraClass} onClick={event}>
            {buttonLable}
        </button>
    )
}

export default ActionButton