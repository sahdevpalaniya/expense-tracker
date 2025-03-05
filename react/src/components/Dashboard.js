import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/dashboard.css';
// Make sure to install and import Font Awesome in your project
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faChartBar, faWallet, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <div className="advertisement-banner">
                    <p>Exclusive Offer! Get 20% off your next purchase.</p>
                </div>
                <h2>Expense Tracker</h2>
                <div className="dashboard-grid">
                    <Link to="/expense" className="dashboard-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faMoneyBillWave} />
                        </div>
                        <span>Expenses</span>
                    </Link>

                    <Link to="/report" className="dashboard-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faChartBar} />
                        </div>
                        <span>Reports</span>
                    </Link>

                    <Link to="/budget" className="dashboard-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faWallet} />
                        </div>
                        <span>Budget</span>
                    </Link>

                    <button onClick={handleLogout} className="dashboard-item">
                        <div className="icon-bracket">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </div>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;