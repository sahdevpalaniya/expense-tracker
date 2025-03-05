import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: '', status: '' });

    const showAlert = (message, status) => {
        setAlert({ message, status });

        setTimeout(() => {
            setAlert({ message: '', status: '' });
        }, 5000);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert }} className="alert-messages">
            {children}
        </AlertContext.Provider>
    );
};

// Custom hook to use the alert context
export const useAlert = () => {
    return useContext(AlertContext);
};
