import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilesForCustomer, deleteFile, downloadFile } from '../services/fileService';
import { logout } from '../services/authService';

const FileList = () => {
    const { customerId } = useParams();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                console.log('Fetching files for customerId:', customerId); // Debugging line
                const response = await getFilesForCustomer(customerId);
                setFiles(response);
            } catch (error) {
                console.error('Error fetching files:', error);
                if (error.message === 'Token expired') {
                    alert('Session expired. Please log in again.');
                    logout();
                } else {
                    alert('Failed to fetch files');
                }
            }
        };

        fetchFiles();
    }, [customerId]);

    const handleDelete = async (fileId) => {
        try {
            await deleteFile(fileId);
            setFiles(files.filter(file => file.fileId !== fileId));
            alert('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Failed to delete file');
        }
    };

    const handleDownload = async (fileId, fileName) => {
        try {
            const response = await downloadFile(fileId);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download file');
        }
    };

    return (
        <div>
            <h2>File List for Customer {customerId}</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.fileId}>
                        {file.fileName}
                        <button onClick={() => handleDownload(file.fileId, file.fileName)}>Download</button>
                        <button onClick={() => handleDelete(file.fileId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
