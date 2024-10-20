import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  Grid,
  TextField,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const ProfileLayout = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState({
    mainInfo: false,
    artistInfo: false,
    wallet: false,
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    artStyle: '',
    portfolioUrl: '',
    walletAddress: '',
  });
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserProfile(response.data);
        setFormData((prevData) => ({
          ...prevData,
          firstName: response.data.profile.firstName,
          lastName: response.data.profile.lastName,
          username: response.data.username,
          email: response.data.email,
        }));
        setAvatar(response.data.profile.avatarUrl); // Assuming you have an avatarUrl field
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes for form fields
  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Toggle edit mode for specified section
  const handleEditClick = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle saving updated profile information
  const handleSave = async (section, updateData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        'http://localhost:5000/api/user/profile',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFormData((prev) => ({ ...prev, ...data }));
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      handleEditClick(section);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile' });
    } finally {
      setLoading(false);
    }
  };

  // Handle saving specific sections
  const handleSaveSection = (section) => {
    const updateData = {
      mainInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      artistInfo: {
        artStyle: formData.artStyle,
        portfolioUrl: formData.portfolioUrl,
      },
      wallet: {
        walletAddress: formData.walletAddress,
      },
    }[section];

    if (updateData) {
      handleSave(section, updateData);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const avatarData = new FormData();
    avatarData.append('avatar', file);

    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/user/upload-avatar',
        avatarData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setAvatar(data.avatarUrl);
      setMessage({ type: 'success', text: 'Avatar uploaded successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error uploading avatar' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: '900px',
        mx: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Message display */}
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* User Avatar Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar src={avatar} alt="User Avatar" sx={{ height: '100px', width: '100px', mr: 3 }} />
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'grey.200' },
                }}
              >
                <EditIcon />
                <input type="file" hidden onChange={handleAvatarChange} />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {formData.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formData.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Main Info Section */}
          <Box mb={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Main Info
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  disabled={!isEditing.mainInfo}
                  onChange={(e) => handleInputChange(e, 'firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  disabled={!isEditing.mainInfo}
                  onChange={(e) => handleInputChange(e, 'lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber || ''}
                  disabled={!isEditing.mainInfo}
                  onChange={(e) => handleInputChange(e, 'phoneNumber')}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              startIcon={isEditing.mainInfo ? <SaveIcon /> : <EditIcon />}
              onClick={() =>
                isEditing.mainInfo ? handleSaveSection('mainInfo') : handleEditClick('mainInfo')
              }
              sx={{ mt: 3 }}
            >
              {isEditing.mainInfo ? 'Save' : 'Edit'}
            </Button>
          </Box>

          {/* Artist Info Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Artist Info
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Art Style"
                value={formData.artStyle}
                disabled={!isEditing.artistInfo}
                onChange={(e) => handleInputChange(e, 'artStyle')}
              />
              <TextField
                fullWidth
                label="Portfolio URL"
                value={formData.portfolioUrl}
                disabled={!isEditing.artistInfo}
                onChange={(e) => handleInputChange(e, 'portfolioUrl')}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                startIcon={isEditing.artistInfo ? <SaveIcon /> : <EditIcon />}
                onClick={() =>
                  isEditing.artistInfo ? handleSaveSection('artistInfo') : handleEditClick('artistInfo')
                }
                sx={{ mt: 3 }}
              >
                {isEditing.artistInfo ? 'Save' : 'Edit'}
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* Wallet Info Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Wallet Info
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Wallet Address"
                value={formData.walletAddress}
                disabled={!isEditing.wallet}
                onChange={(e) => handleInputChange(e, 'walletAddress')}
              />
              <Button
                variant="contained"
                startIcon={isEditing.wallet ? <SaveIcon /> : <EditIcon />}
                onClick={() =>
                  isEditing.wallet ? handleSaveSection('wallet') : handleEditClick('wallet')
                }
                sx={{ mt: 3 }}
              >
                {isEditing.wallet ? 'Save' : 'Edit'}
              </Button>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Box>
  );
};

export default ProfileLayout;
