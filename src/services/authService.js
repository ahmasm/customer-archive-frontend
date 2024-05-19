// src/services/authService.js
import axiosInstance from './axiosInstance';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/auth/`;

export const register = async (username, email, password) => {
    try {
        const response = await axiosInstance.post(`${API_URL}register`, {
            username,
            email,
            password,
        });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify({ token: response.data }));
        }
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error.response || error.message);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Registration failed');
        }
    }
};

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post(`${API_URL}login`, {
            username,
            password,
        });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify({ token: response.data }));
        }
        return response.data;
    } catch (error) {
        console.error("Error during login:", error.response || error.message);
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error('Login failed');
        }
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
};
