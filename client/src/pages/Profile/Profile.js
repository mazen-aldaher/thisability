import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import ProfileLayout from './components/ProfileLayout';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // For showing success message

  useEffect(() => {
    const fetchUserProfile = async () => {
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
        } catch (err) {
          console.error('Error fetching user', err);
          localStorage.removeItem('token');
          setError('Failed to fetch user profile. Please log in again.');
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No token found. Please log in.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Function to update the user profile
  const updateUserProfile = async (updatedUserData) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await axios.put(
          'http://localhost:5000/api/user/profile',
          updatedUserData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data); // Update the local user state with the new data
        setSuccessMessage('Profile updated successfully.');
        setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
      } catch (err) {
        console.error('Error updating user profile', err);
        setError('Failed to update profile. Please try again.');
        setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

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
        flexDirection:"column",
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
              sx={{ mb: 3, maxWidth: '500px', width: '100%', textAlign: 'center' }}
            >
              {successMessage}
            </Alert>
          )}
          <ProfileLayout user={user} onSave={updateUserProfile} /> {/* Pass the update function to ProfileLayout */}
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
