import React from 'react';
import { Avatar, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const AvatarComponent = ({ avatar, onAvatarChange, onUpload }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Avatar src={avatar} alt="User Avatar" sx={{ height: '100px', width: '100px', mr: 3 }} />
      <IconButton color="primary" component="label" sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white' }}>
        <EditIcon />
        <input type="file" hidden accept="image/*" onChange={onAvatarChange} />
      </IconButton>
      <Button variant="contained" onClick={onUpload} sx={{ mt: 2 }}>
        Upload Avatar
      </Button>
    </div>
  );
};

export default AvatarComponent;
