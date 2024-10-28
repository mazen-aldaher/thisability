import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import ProfileLayout from './components/ProfileLayout';
import { useAuth } from '../../context/AuthContext';
import { useUsers } from '../../context/UsersContext';
import { useLoading } from '../../context/LoadingContext';

const Profile = () => {
  const { user } = useAuth();
  const { loading, stopLoading, startLoading } = useLoading();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { fetchUserProfile, updateUserProfile } = useUsers();

  useEffect(() => {
    const loadUserProfile = async () => {
      startLoading();
      try {
        await fetchUserProfile(); // Call to fetch the user profile
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        stopLoading();
      }
    };

    loadUserProfile();
  }, []);

  // Function to handle profile update
  const handleProfileUpdate = async (updatedUserData) => {
    const result = await updateUserProfile(updatedUserData); // Call updateUserProfile
    if (result) {
      setSuccessMessage('Profile updated successfully.');
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } else {
      setError('Failed to update profile. Please try again.');
      setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
    }
  };

  if (error) {
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert
          severity="error"
          sx={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '2rem 0',
      }}
    >
      {user ? (
        <>
          {successMessage && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                maxWidth: '500px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {successMessage}
            </Alert>
          )}
          <ProfileLayout /> 
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          No user profile found.
        </Typography>
      )}
    </Box>
  );
};

export default Profile;
