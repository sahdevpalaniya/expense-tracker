import React from 'react';
import '../../assets/styles/Input.css';

const Input = ({ label, type = 'text', value, onChange, name, placeholder, required = true }) => {
    return (
        <div className="input-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="input-field"
            />
        </div>
    );
};

export default Input;