import React from 'react';
import { useAlert } from './context/AlertContext';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = () => {
    const { alert } = useAlert();

    return (
        <Snackbar
            open={Boolean(alert.message)}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MuiAlert
                severity={alert.status}
                sx={{ width: '100%' }}
            >
                {alert.message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alert;
