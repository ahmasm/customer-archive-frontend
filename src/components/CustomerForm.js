// src/components/CustomerForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCustomer, updateCustomer, getCustomerById } from '../services/customerService';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({ name: '', email: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchCustomer = async () => {
                try {
                    const response = await getCustomerById(id);
                    setCustomer(response);
                } catch (error) {
                    console.error('Error fetching customer:', error);
                }
            };

            fetchCustomer();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateCustomer(id, customer);
                alert('Customer updated successfully');
            } else {
                await addCustomer(customer);
                alert('Customer added successfully');
            }
            navigate('/customers');
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Update Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={customer.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={customer.email} onChange={handleChange} required />
                </div>
                <button type="submit">{id ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default CustomerForm;
