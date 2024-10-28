import React from 'react';
import { Avatar, Box, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const AvatarComponent = ({ avatar, handleAvatarChange }) => {
  return (
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
  );
};

export default AvatarComponent;
