import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from './NotificationContext';
import { useLoading } from './LoadingContext';
import { useErrors } from './ErrorsContext';

const apiUrl = process.env.REACT_APP_API_URL;
// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { showNotification } = useNotification();
  const { startLoading, stopLoading } = useLoading();
  const { setError } = useErrors();

  // Check localStorage for token and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${apiUrl}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      };
      fetchUser();
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
     
      const response = await axios.post(`${apiUrl}/user/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      showNotification('Login successful!', 'success');
      return response;
    } catch (err) {
      setError(err.response?.data || 'An error occurred during login');
      showNotification('Error logging in.', 'error');
      console.error('Error logging in:', err);
      throw err;
    } finally {
      stopLoading();
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      startLoading();
      const response = await axios.post(
        `${apiUrl}/user/register`,
        { username, email, password }
      );
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      showNotification('User registered successfully!', 'success');
      return response;
    } catch (err) {
      setError(err.response?.data || 'An error occurred during registration');
      showNotification('Error registering user.', 'error');
      console.error('Error registering:', err);
      throw err;
    } finally {
      stopLoading();
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    showNotification('Logged out successfully!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
