import React from 'react';
import '../../assets/styles/Menu.css';
import { Link } from 'react-router-dom';

const Menu = ({ link, icon, name }) => {
    return (
        <Link to={link}>
            <div className="menu-item">
                <i className={`icon fas ${icon}`}></i>
                <span className="menu-label">{name}</span>
            </div>
        </Link>
    );
};

export default Menu;
