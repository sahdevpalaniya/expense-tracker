import React from 'react';
import './List.css';

function List({ data }) {

  if (!Array.isArray(data)) {
    return <div className="error">Invalid data format</div>;
  }

  return (
    <div className="expense-list">
      {data.length > 0 ? (
        data.map((expense, index) => (
          <div key={index} className="expense-item">
            <div className="expense-info">
              <span className="description">{expense.description}</span>
              <span className="category">({expense.category})</span>
              <span className={`amount ${expense.type}`}>₹{expense.amount}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-expenses">No expenses recorded</div>
      )}
    </div>
  );
}

export default List;
