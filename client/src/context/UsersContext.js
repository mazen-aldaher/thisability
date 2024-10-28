/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLoading } from './LoadingContext';
import { useErrors } from './ErrorsContext';
import { useAuth } from './AuthContext';
import { useSelectedUser } from './SelectedUserContext';
import { useNotification } from './NotificationContext';

const apiUrl = process.env.REACT_APP_API_URL;

// Create the UsersContext
const UsersContext = createContext();

// Provider component
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { setUser } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading();
  const { setError } = useErrors();
  const { setSelectedUser } = useSelectedUser();
  const { showNotification } = useNotification();

  // Fetch all users
  const fetchUsers = async () => {
    startLoading();
    setError(null);
    try {
      const { data } = await axios.get(`${apiUrl}/user`);
      setUsers(data);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      stopLoading();
    }
  };

// Fetch current user profile
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      startLoading();
      try {
        const { data } = await axios.get(
          `${apiUrl}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data);
        return data; // Return the fetched user data
      } catch (err) {
        console.error('Error fetching user', err);
        localStorage.removeItem('token');
        setError('Failed to fetch user profile. Please log in again.');
        setUser(null);
      } finally {
        stopLoading();
      }
    } else {
      setError('No token found. Please log in.');
      stopLoading();
    }
  };
  // Function to update the user profile
  const updateUserProfile = async (updatedUserData) => {
    const token = localStorage.getItem('token');
    if (token) {
      startLoading();
      setError(null); // Reset any previous errors
      try {
        const { data } = await axios.put(
          `${apiUrl}/user/profile`,
          updatedUserData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(data); // Update the local user state with the new data
        showNotification('Profile updated successfully.', 'success');
        return data; // Return updated user data if needed
      } catch (err) {
        console.error('Error updating user profile', err);
        setError('Failed to update profile. Please try again.');
        return null; // Return null in case of error
      } finally {
        stopLoading();
      }
    } else {
      setError('No token found. Please log in.');
      stopLoading();
      return null; // Return null if no token
    }
  };

  // Function to get a specific user by ID
  const getUserById = async (userId) => {
    startLoading();
    setError(null);
    try {
      const { data } = await axios.get(`${apiUrl}/user/${userId}`);
      setSelectedUser(data);
      showNotification('User fetched successfully!', 'success');
      return data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      setError('Error fetching user by ID.');
    } finally {
      stopLoading();
    }
  };

  // Fetch admin users
  const fetchAdminUsers = async () => {
    startLoading();
    setError(null);
    try {
      const { data } = await axios.get(`${apiUrl}/user`);
      const adminUsers = data.filter((user) => user.role === 'admin');
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
      const { data } = await axios.post(`${apiUrl}/user/register`, userData);
      setUsers((prevUsers) => [...prevUsers, data]);
      showNotification('User created successfully!', 'success');
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
      const { data } = await axios.put(`${apiUrl}/user/${userId}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? data : user))
      );
      showNotification('User updated successfully!', 'success');
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
      await axios.delete(`${apiUrl}/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      showNotification('User deleted successfully!', 'success');
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
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        fetchAdminUsers,
        getUserById,
        fetchUserProfile,
        updateUserProfile,
        loading: startLoading,
        error: setError,
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
