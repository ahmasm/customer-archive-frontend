import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCustomers, deleteCustomer } from '../services/customerService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getAllCustomers();
                console.log('Fetched customers:', response); // Debugging line
                setCustomers(response);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter(customer => customer.customerId !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div>
            <h2>Customer List</h2>
            <Link to="/add-customer">Add Customer</Link>
            <ul>
                {customers.map(customer => {
                    console.log('Customer:', customer); // Debugging line
                    return (
                        <li key={customer.customerId}>
                            {customer.name} - {customer.email}
                            <Link to={`/update-customer/${customer.customerId}`}>Update</Link>
                            <Link to={`/files/${customer.customerId}`}>View Files</Link>
                            <Link to={`/upload-file/${customer.customerId}`}>Upload File</Link>
                            <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CustomerList;
