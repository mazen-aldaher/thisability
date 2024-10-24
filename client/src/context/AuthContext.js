import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State for the individual user fetched by ID
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [users, setUsers] = useState([]); // State for managing users list

  // Fetch current user profile
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get(
            'http://localhost:5000/api/user/profile',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(data);
          setUserRole(data.role);
          setOnboardingComplete(data.isOnboardingComplete ?? true); // Default to true if not artist
          fetchUsers(); // Fetch users after successful login
        } catch (error) {
          console.error('Error fetching user', error);
          localStorage.removeItem('token');
          setUser(null);
          setUserRole(null);
          setOnboardingComplete(false);
        }
      }
    };
    fetchUser();
  }, []);

  // Function to show notifications
  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Fetch users for admin
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/user');
      setUsers(data); // Correctly set users from response data
    } catch (error) {
      showNotification('Error fetching users.', 'error');
      console.error('Error fetching users:', error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
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
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
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
    }
  };

  // Create a new user (admin functionality)
  const createUser = async (newUser) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/register',
        newUser
      );
      setUsers((prevUsers) => [...prevUsers, response.data]);
      showNotification('User created successfully!', 'success');
    } catch (error) {
      showNotification('Error creating user.', 'error');
      console.error('Error creating user:', error);
    }
  };

  // Function to get a specific user by ID
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      setSelectedUser(response.data);
      showNotification('User fetched successfully!', 'success');
      return response.data; // Return the user data
    } catch (error) {
      showNotification('Error fetching user by ID.', 'error');
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  };

  // Update user
  const updateUser = async (userId, updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? response.data : user))
      );
      showNotification('User updated successfully!', 'success');
    } catch (error) {
      showNotification('Error updating user.', 'error');
      console.error('Error updating user:', error);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      showNotification('User deleted successfully!', 'success');
    } catch (error) {
      showNotification('Error deleting user.', 'error');
      console.error('Error deleting user:', error);
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

  // Handle closing notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
        createUser,
        updateUser,
        deleteUser,
        users,
        fetchUsers,
        getUserById,
      }}
    >
      {children}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};
