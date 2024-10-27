import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the UsersContext
const UsersContext = createContext();

// Provider component
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (err) {
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  // Update a user
  const updateUser = async (userId, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? response.data : user))
      );
    } catch (err) {
      setError('Error updating user');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, error, fetchUsers, addUser, updateUser, deleteUser }}>
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
