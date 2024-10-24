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
import AvatarComponent from '../../../components/AvatarComponent';

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
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/user/profile',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUserProfile(response.data);
      setFormData((prevData) => ({
        ...prevData,
        firstName: response.data.profile.firstName,
        lastName: response.data.profile.lastName,
        username: response.data.username,
        email: response.data.email,
      }));
      setAvatar(response.data.profile.avatar);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditClick = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveSection = async (section) => {
    setLoading(true);
    const updateData = {
      mainInfo: { firstName: formData.firstName, lastName: formData.lastName },
      artistInfo: {
        artStyle: formData.artStyle,
        portfolioUrl: formData.portfolioUrl,
      },
      wallet: { walletAddress: formData.walletAddress },
    }[section];

    if (updateData) {
      try {
        await axios.put('http://localhost:5000/api/user/profile', updateData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        handleEditClick(section);
        fetchUserProfile(); // Refresh the user profile immediately
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Error updating profile',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (file, quality = 0.7) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 800; // Set a maximum width
        const maxHeight = 800; // Set a maximum height
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions based on the maximum width and height
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

        // Convert the canvas to a blob
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          'image/jpeg',
          quality
        ); // Adjust the quality parameter as needed
      };
    });
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;

    // Compress the image before uploading
    const compressedFile = await compressImage(avatarFile);

    const avatarData = new FormData();
    avatarData.append('avatar', compressedFile);

    setLoading(true);
    try {
      await axios.put('http://localhost:5000/api/user/profile', avatarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage({ type: 'success', text: 'Avatar uploaded successfully' });
      fetchUserProfile(); // Refresh the user profile immediately after upload
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
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={avatar}
                alt="User Avatar"
                sx={{ height: '100px', width: '100px', mr: 3 }}
              />
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
                <input
                  type="file"
                  hidden
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {formData.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formData.email}
              </Typography>
              <Button variant="contained" onClick={uploadAvatar} sx={{ mt: 2 }}>
                Upload Avatar
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />
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
            </Grid>
            <Button
              variant="contained"
              startIcon={isEditing.mainInfo ? <SaveIcon /> : <EditIcon />}
              onClick={() =>
                isEditing.mainInfo
                  ? handleSaveSection('mainInfo')
                  : handleEditClick('mainInfo')
              }
              sx={{ mt: 3 }}
            >
              {isEditing.mainInfo ? 'Save' : 'Edit'}
            </Button>
          </Box>

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
                  isEditing.artistInfo
                    ? handleSaveSection('artistInfo')
                    : handleEditClick('artistInfo')
                }
                sx={{ mt: 3 }}
              >
                {isEditing.artistInfo ? 'Save' : 'Edit'}
              </Button>
            </AccordionDetails>
          </Accordion>

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
                  isEditing.wallet
                    ? handleSaveSection('wallet')
                    : handleEditClick('wallet')
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
