import React, { useState } from 'react';
import { Avatar, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AvatarComponent = ({ avatar, onChange, onClick }) => {
  const [hasFile, setHasFile] = useState(false);

  // Handle file selection and update state
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setHasFile(true); // File selected
    } else {
      setHasFile(false); // No file selected
    }
    onChange(e); // Call the passed-in onChange handler if needed
  };

  return (
    <>
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
            top: 0,
            right: 15,
            backgroundColor: 'white',
            border: 'solid 1px #eded',
            '&:hover': { backgroundColor: 'grey.200' },
          }}
        >
          <EditIcon sx={{ width: '15px', height: '15px' }} />
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </IconButton>
        
        <IconButton
          color="default"
          component="label"
          sx={{
            position: 'absolute',
            top: 80,
            right: 55,
            backgroundColor: hasFile ? '#007BFF' : '#fff', // Active color if file is selected
            borderRadius: '20px',
            border: 'solid 1px #eded',
            borderColor: hasFile ? '#007BFF' : '#eded', // Active border if file is selected
            color: hasFile ? '#fff' : 'grey', // Icon color when active/inactive
            '&:hover': { backgroundColor: hasFile ? '#0056b3' : '#eded' }, // Darker shade on hover if active
          }}
          onClick={onClick}
          disabled={!hasFile} // Disable button if no file selected
        >
          <CloudUploadIcon sx={{ width: '15px', height: '15px' }} />
        </IconButton>
      </Box>
    </>
  );
};

export default AvatarComponent;
