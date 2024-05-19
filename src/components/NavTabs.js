// src/components/NavTabs.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavTabs = () => (
    <nav>
        <ul>
            <li>
                <NavLink to="/customers" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Customers
                </NavLink>
            </li>
            <li>
                <NavLink to="/add-customer" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Add Customer
                </NavLink>
            </li>
            <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Register
                </NavLink>
            </li>
            <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/upload-file/:customerId" activeClassName="active">
                    Upload File
                </NavLink>
            </li>
            <li>
                <NavLink to="/files/:customerId" activeClassName="active">
                    File List
                </NavLink>
            </li>
        </ul>
    </nav>
);

export default NavTabs;
