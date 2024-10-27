/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUsers } from './UsersContext';
import { useSelectedUser } from './SelectedUserContext';
import { useNotification } from './NotificationContext';
import { useLoading } from './LoadingContext';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUsers();
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const [userRole, setUserRole] = useState(null);
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);
  const { showNotification } = useNotification();
  const { startLoading, stopLoading, loading } = useLoading();

  // Fetch current user profile
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        startLoading();
        const { data } = await axios.get(
          'http://localhost:5000/api/user/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(data);
        setUserRole(data.role);
        setOnboardingComplete(data.isOnboardingComplete ?? true);
        fetchUsers();
      } catch (error) {
        console.error('Error fetching user', error);
        localStorage.removeItem('token');
        setUser(null);
        setUserRole(null);
        setOnboardingComplete(false);
      } finally {
        stopLoading();
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      startLoading();
      const response = await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      setUserRole(response.data.role);
      setOnboardingComplete(response.data.isOnboardingComplete);
      showNotification('Login successful!', 'success');
      return response;
    } catch (error) {
      showNotification('Error logging in.', 'error');
      console.error('Error logging in', error);
      throw error;
    } finally {
      stopLoading();
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      startLoading();
      const response = await axios.post(
        'http://localhost:5000/api/user/register',
        { username, email, password }
      );
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      setUserRole(response.data.role);
      setOnboardingComplete(response.data.isOnboardingComplete);
      showNotification('User registered successfully!', 'success');
      return response;
    } catch (error) {
      showNotification('Error registering user.', 'error');
      console.error('Error registering', error);
      throw error;
    } finally {
      stopLoading();
    }
  };

  // Function to get a specific user by ID
  const getUserById = async (userId) => {
    try {
      startLoading();
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`
      );
      setSelectedUser(response.data);
      showNotification('User fetched successfully!', 'success');
      return response.data;
    } catch (error) {
      showNotification('Error fetching user by ID.', 'error');
      console.error('Error fetching user by ID:', error);
      throw error;
    } finally {
      stopLoading();
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserRole(null);
    setOnboardingComplete(false);
    showNotification('Logged out successfully!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isOnboardingComplete,
        setOnboardingComplete,
        login,
        register,
        logout,
        createUser: addUser,
        updateUser,
        deleteUser,
        users,
        fetchUsers,
        getUserById,
        loading,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
