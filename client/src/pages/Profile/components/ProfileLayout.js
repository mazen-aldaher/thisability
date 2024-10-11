import React, { useState } from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';

const ProfileLayout = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState({
    mainInfo: false,
    artistInfo: false,
    wallet: false,
    socialLinks: false,
    additionalInfo: false,
  });

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    artStyle: user.artStyle,
    portfolioUrl: user.portfolioUrl,
    walletAddress: user.walletAddress,
    bio: user.bio,
  });

  const [avatar, setAvatar] = useState(user.avatarUrl);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditClick = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = (section) => {
    onSave(formData); // Call the passed in onSave function to update the profile
    handleEditClick(section);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set up form data for uploading image
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:5000/api/user/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Set the new avatar URL after successful upload
      setAvatar(data.avatarUrl);
    } catch (error) {
      console.error('Error uploading avatar', error);
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
            <input type="file" hidden onChange={handleAvatarChange} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {user.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
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
              value={formData.phoneNumber}
              disabled={!isEditing.mainInfo}
              onChange={(e) => handleInputChange(e, 'phoneNumber')}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          startIcon={isEditing.mainInfo ? <SaveIcon /> : <EditIcon />}
          onClick={() =>
            isEditing.mainInfo
              ? handleSave('mainInfo')
              : handleEditClick('mainInfo')
          }
          sx={{ mt: 3 }}
        >
          {isEditing.mainInfo ? 'Save' : 'Edit'}
        </Button>
      </Box>

      {/* Accordion for Artist Info */}
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
                ? handleSave('artistInfo')
                : handleEditClick('artistInfo')
            }
            sx={{ mt: 3 }}
          >
            {isEditing.artistInfo ? 'Save' : 'Edit'}
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Accordion for Wallet Info */}
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
                ? handleSave('wallet')
                : handleEditClick('wallet')
            }
            sx={{ mt: 3 }}
          >
            {isEditing.wallet ? 'Save' : 'Edit'}
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProfileLayout;
