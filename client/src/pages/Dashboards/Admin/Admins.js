/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  DialogContentText,
} from '@mui/material';
import AdminTable from './AdminTable';
import DashContainer from '../../../components/DashContainer/DashContainer';
import { useModal } from '../../../context/ModalContext';
import { useNotification } from '../../../context/NotificationContext';
import { useUsers } from '../../../context/UsersContext';
import { useSearchQuery } from '../../../context/SearchQueryContext';
import { useButtonLoading } from '../../../context/ButtonLoadingContext';
import { useNewUser } from '../../../context/NewUserContext';
import { useSelectedUser } from '../../../context/SelectedUserContext';
import { useLoading } from '../../../context/LoadingContext';

const Users = () => {
  const { loading } = useLoading();
  const { selectedUser } = useSelectedUser();

  const {
    isEditMode,
    setIsEditMode,
    isModalOpen,
    setIsModalOpen,
    isCreateMode,
    setIsCreateMode,
    selectedItem,
    setSelectedItem,
  } = useModal();
  const { fetchAdminUsers, users, updateUser } = useUsers();

  const { showNotification } = useNotification();
  const { searchQuery, setSearchQuery } = useSearchQuery(); // State for search query
  const { buttonLoading, startButtonLoading, stopButtonLoading } =
    useButtonLoading();

  const { newUser, setNewUser, resetNewUser, updateNewUser } = useNewUser();

  const [errors, setErrors] = useState({});

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {},
  }); // Confirmation dialog for delete and suspend actions

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const handleViewOrEdit = async (userId, editMode = false) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        selectedItem
      );
      setSelectedItem(response);
      setIsEditMode(editMode);
      setIsModalOpen(true);
    } catch (error) {
      showNotification(
        'Error fetching user details. Please try again.',
        'error'
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setIsEditMode(false);
    setIsCreateMode(false);
  };

  const handleUpdate = async () => {
    if (selectedItem) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/user/${selectedItem._id}`,
          selectedItem
        );
        fetchAdminUsers(response);
        handleCloseModal();
        showNotification('User updated successfully!', 'success');
      } catch (error) {
        showNotification('Error updating user. Please try again.', 'error');
      }
    }
  };

  const handleSuspend = async (userId) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to suspend this user?'
      );
      if (!confirmed) return;

      await axios.put(`http://localhost:5000/api/user/suspend/${userId}`);
      fetchAdminUsers(); // Refresh the list of users
      showNotification('User suspended successfully!', 'success');
    } catch (error) {
      showNotification('Error suspending user. Please try again.', 'error');
    }
  };

  const handleReactivate = async (userId) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to reactivate this user?'
      );
      if (!confirmed) return;

      await axios.put(`http://localhost:5000/api/user/reactivate/${userId}`);
      fetchAdminUsers(); // Refresh the list of users
      showNotification('User reactivated successfully!', 'success');
    } catch (error) {
      showNotification('Error reactivating user. Please try again.', 'error');
    }
  };

  const handleDelete = async (userId) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure you want to delete this user?',
      subTitle: 'You cannot undo this action',
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/user/${userId}`);
          fetchAdminUsers();
          showNotification('User deleted successfully!', 'success');
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        } catch (error) {
          showNotification('Error deleting user. Please try again.', 'error');
        }
      },
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!newUser.username) newErrors.username = 'Username is required';
    if (!newUser.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!newUser.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modified handleCreate
  const handleCreate = async () => {
    if (!validate()) return;
    startButtonLoading();
    try {
      // Submit newUser data to the backend
      await axios.post('http://localhost:5000/api/user/register', newUser);
      fetchAdminUsers();
      resetNewUser(); // Reset the form fields after creation
      showNotification('User created successfully!', 'success');
      handleCloseModal();
    } catch (error) {
      showNotification('Error creating user. Please try again.', 'error');
    } finally {
      stopButtonLoading();
    }
  };

  // Modified handleNewUserInputChange
  const handleNewUserInputChange = (e) => {
    updateNewUser(e.target.name, e.target.value); // Use updateNewUser to handle input changes
  };
  const handleInputChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const generatePassword = () => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    setNewUser({ ...newUser, password });
  };
  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateDialog = () => {
    setIsCreateMode(true);
    setIsModalOpen(true);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box>
          <DashContainer
            SBox
            handleAdd={openCreateDialog}
            title="Admin Users Console"
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          >
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 4,
                  width: '90vw',
                }}
              >
                <CircularProgress />
              </Box>
            ) : users.length > 0 ? (
              <>
                <AdminTable
                  users={users}
                  handleView={(user) => handleViewOrEdit(user, false)}
                  handleUpdate={(user) => handleViewOrEdit(user, true)}
                  handleDelete={handleDelete}
                  searchQuery={searchQuery}
                  handleSearchChange={handleSearchChange}
                  filteredUsers={filteredUsers}
                  handleSuspend={handleSuspend}
                  handleReactivate={handleReactivate}
                />
              </>
            ) : (
              <Typography variant="h6" align="center">
                No Admin Data found.
              </Typography>
            )}
          </DashContainer>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.isOpen}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.subTitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDialog.onConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Details Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{isEditMode ? 'Edit User' : 'User Details'}</DialogTitle>
        <DialogContent>
          {selectedUser ? (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="User ID"
                value={selectedUser._id}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={selectedUser?.username}
                onChange={isEditMode ? handleInputChange : null}
                InputProps={{ readOnly: !isEditMode }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={selectedUser.email}
                onChange={isEditMode ? handleInputChange : null}
                InputProps={{ readOnly: !isEditMode }}
              />
              <Select
                fullWidth
                margin="normal"
                label="Role"
                name="role"
                value={selectedUser.role}
                onChange={isEditMode ? handleInputChange : null}
                disabled={!isEditMode}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </>
          ) : isCreateMode ? (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={newUser.username}
                onChange={handleNewUserInputChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <Select
                fullWidth
                margin="normal"
                label="Role"
                name="role"
                value={newUser.role}
                onChange={handleNewUserInputChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                value={newUser.password}
                onChange={handleNewUserInputChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                onClick={generatePassword}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Generate Password
              </Button>
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          {isEditMode && (
            <Button
              onClick={handleUpdate}
              color="primary"
              disabled={buttonLoading} // Disable button when loading
              startIcon={
                buttonLoading ? <CircularProgress size={20} /> : null // Show loading spinner
              }
            >
              Update
            </Button>
          )}
          {isCreateMode && (
            <Button
              onClick={handleCreate}
              color="primary"
              disabled={buttonLoading} // Disable button when loading
              startIcon={
                buttonLoading ? <CircularProgress size={20} /> : null // Show loading spinner
              }
            >
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
