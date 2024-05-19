// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import Login from './components/Login';
import Register from './components/Register';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <LogoutButton />
        </nav>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<CustomerList />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customers" element={<PrivateRoute element={<CustomerList />} />} />
          <Route path="/files/:customerId" element={<PrivateRoute element={<FileList />} />} />
          <Route path="/upload-file/:customerId" element={<PrivateRoute element={<FileUpload />} />} /> {/* Updated path */}
          <Route path="/add-customer" element={<PrivateRoute element={<CustomerForm />} />} />
          <Route path="/update-customer/:id" element={<PrivateRoute element={<CustomerForm />} />} /> {/* Updated path */}

          <Route path="/dashboard" element={<PrivateRoute element={<CustomerList />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
