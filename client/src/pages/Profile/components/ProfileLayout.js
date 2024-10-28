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
import { useAuth } from '../../../context/AuthContext';
import { useErrors } from '../../../context/ErrorsContext';
import { useLoading } from '../../../context/LoadingContext';
import { useNotification } from '../../../context/NotificationContext';
import AvatarComponent from './AvatarComponent';
import MainInfo from './MainInfo';
import ArtistInfo from './ArtistInfo';
import WalletInfo from './WalletInfo';

const ProfileLayout = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState({
    mainInfo: false,
    artistInfo: false,
    wallet: false,
  });
  const [formData, setFormData] = useState(user);
  const [avatar, setAvatar] = useState('');
  const { loading, startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const { error, setError } = useErrors();
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    startLoading();
    try {
      const response = await axios.get(
        'http://localhost:5000/api/user/profile',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUser(response.data);
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
      stopLoading();
    }
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditClick = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveSection = async (section) => {
    startLoading();
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
        showNotification('Profile updated successfully', 'success');
        handleEditClick(section);
        fetchUserProfile(); // Refresh the user profile immediately
      } catch (error) {
        showNotification(
          error.response?.data?.message || 'Error updating profile',
          'error'
        );
      } finally {
        stopLoading();
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

    startLoading();
    try {
      await axios.put('http://localhost:5000/api/user/profile', avatarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showNotification('Avatar uploaded successfully', 'success');
      fetchUserProfile(); // Refresh the user profile immediately after upload
    } catch (error) {
      showNotification('Error uploading avatar', 'error');
    } finally {
      stopLoading();
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
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <AvatarComponent
              avatar={avatar}
              onChange={handleAvatarChange}
              onUpload={uploadAvatar}
              onClick={uploadAvatar}
            />

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

          <Box mb={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Main Info
            </Typography>
            <MainInfo
              formData={formData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              handleEditClick={handleEditClick}
              handleSaveSection={handleSaveSection}
            />
          </Box>
          <ArtistInfo
            formData={formData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleEditClick={handleEditClick}
            handleSaveSection={handleSaveSection}
          />

          <WalletInfo
            formData={formData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleEditClick={handleEditClick}
            handleSaveSection={handleSaveSection}
          />
        </>
      )}
    </Box>
  );
};

export default ProfileLayout;
