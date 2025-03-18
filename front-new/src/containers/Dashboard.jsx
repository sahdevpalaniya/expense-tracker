import React from 'react';
import '../assets/styles/Dashboard.css';
import Menu from '../components/common/Menu';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="menu">
                <Menu link="/expense" icon="fa-chart-pie" name="Expenses"></Menu>
                <Menu link="#" icon="fa-credit-card" name="Payments"></Menu>
                <Menu link="#" icon="fa-wallet" name="Wallet"></Menu>
            </div>
        </div>
    );
};

export default Dashboard;
