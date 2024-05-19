// src/services/customerService.js
import axiosInstance from './axiosInstance';

const API_URL = '/api/customers/';

export const addCustomer = async (customer) => {
    const response = await axiosInstance.post(`${API_URL}add`, customer);
    return response.data;
};

export const updateCustomer = async (id, customer) => {
    const response = await axiosInstance.put(`${API_URL}${id}`, customer);
    return response.data;
};

export const deleteCustomer = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}${id}`);
    return response.data;
};

export const getAllCustomers = async () => {
    const response = await axiosInstance.get(`${API_URL}getAll`);
    return response.data;
};

export const getCustomerById = async (id) => {
    const response = await axiosInstance.get(`${API_URL}${id}`);
    return response.data;
};
