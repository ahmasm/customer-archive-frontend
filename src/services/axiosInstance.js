// src/services/axiosInstance.js
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { logout } from './authService'; // Import the logout function

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            const token = user.token;
            const tokenExpiration = parseJwt(token).exp * 1000; // Convert to milliseconds
            if (Date.now() >= tokenExpiration) {
                logout(); // Log out if token is expired
                throw new Error('Token expired');
            }
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export default axiosInstance;
