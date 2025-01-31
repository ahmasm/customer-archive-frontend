// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

