/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLoading } from './LoadingContext';
import { useErrors } from './ErrorsContext';

// Create the UsersContext
const UsersContext = createContext();

// Provider component
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, setError } = useErrors();

  // Fetch all users
  const fetchUsers = async () => {
    startLoading();
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      stopLoading();
    }
  };

  // Fetch admin users
  const fetchAdminUsers = async () => {
    startLoading();
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      const adminUsers = response.data.filter((user) => user.role === 'admin');
      setUsers(adminUsers);
    } catch (error) {
      setError('Error fetching admin users');
    } finally {
      stopLoading();
    }
  };

  // Add a new user
  const addUser = async (userData) => {
    startLoading();
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/register',
        userData
      );
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (err) {
      setError('Error creating user');
    } finally {
      stopLoading();
    }
  };

  // Update a user
  const updateUser = async (userId, updatedData) => {
    startLoading();
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        updatedData
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? response.data : user))
      );
    } catch (err) {
      setError('Error updating user');
    } finally {
      stopLoading();
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    startLoading();
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Error deleting user');
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        fetchAdminUsers,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

// Custom hook for using the UsersContext
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
