import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../services/fileService';

const FileUpload = () => {
    const { customerId } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            await uploadFile(customerId, formData);
            setMessage('File uploaded successfully');
            navigate(`/files/${customerId}`); // Redirect to the file list
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file.');
        }
    };

    return (
        <div>
            <h2>Upload File for Customer {customerId}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
