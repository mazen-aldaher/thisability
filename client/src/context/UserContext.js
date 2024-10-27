/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from './NotificationContext';
import { useModal } from './ModalContext';
import { useUsers } from './UsersContext';
import { useLoading } from './LoadingContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { users, setUsers } = useUsers();
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const { closeModal } = useModal();

  // Fetch all users
  const fetchUsers = async () => {
    startLoading();
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUsers(response.data);
      showNotification('Users loaded successfully', 'info');
    } catch (error) {
      showNotification('Error fetching users', 'error');
    } finally {
      stopLoading();
    }
  };

  // Update a user
  const updateUser = async (userId, data) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, data);
      fetchUsers();
      showNotification('User updated successfully', 'success');
      closeModal();
    } catch (error) {
      showNotification('Error updating user', 'error');
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      showNotification('User deleted successfully', 'success');
      closeModal();
    } catch (error) {
      showNotification('Error deleting user', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading: useLoading().loading, fetchUsers, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
