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
  const { user, setUser } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const { startLoading, stopLoading } = useLoading();
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
    startLoading();
    try {
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching user profile');
    } finally {
      stopLoading();
    }
  };

  // Function to update the user profile
  const updateUserProfile = async (updatedUserData) => {
    const token = localStorage.getItem('token');
    if (token) {
      startLoading();
      setError(null);
      try {
        const { data } = await axios.put(
          `${apiUrl}/user/profile`,
          updatedUserData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(data);
        showNotification('Profile updated successfully.', 'success');
        fetchUserProfile();
      } catch (err) {
        setError('Failed to update profile. Please try again.');
        showNotification('Failed to update profile.', 'error');
      } finally {
        stopLoading();
      }
    } else {
      setError('No token found. Please log in.');
      stopLoading();
    }
  };

  const compressImage = (file, quality = 0.7) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          'image/jpeg',
          quality
        );
      };
    });
  };

  // Function to upload avatar
  const uploadAvatar = async (avatarFile) => {
    if (!avatarFile) return;
    const compressedFile = await compressImage(avatarFile);
    const avatarData = new FormData();
    avatarData.append('avatar', compressedFile);

    startLoading();
    try {
      await axios.put(`${apiUrl}/user/profile`, avatarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showNotification('Avatar uploaded successfully', 'success');
      fetchUserProfile();
    } catch (error) {
      showNotification('Error uploading avatar', 'error');
    } finally {
      stopLoading();
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
    fetchUserProfile();
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
        uploadAvatar,
        user,
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
