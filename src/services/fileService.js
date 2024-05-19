// src/services/fileService.js
import axiosInstance from './axiosInstance';

const API_URL = '/files/';

export const uploadFile = async (customerId, formData) => {
    try {
        const response = await axiosInstance.post(`/files/upload/${customerId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during file upload:', error.response || error.message);
        throw error;
    }
};


export const deleteFile = async (fileId) => {
    const response = await axiosInstance.delete(`${API_URL}delete/${fileId}`);
    return response.data;
};

export const updateFile = async (fileId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.put(`${API_URL}update/${fileId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const downloadFile = async (fileId) => {
    const response = await axiosInstance.get(`${API_URL}download/${fileId}`, {
        responseType: 'blob',
    });
    return response.data;
};

export const getFilesForCustomer = async (customerId) => {
    const response = await axiosInstance.get(`${API_URL}customer/${customerId}`);
    return response.data;
};
