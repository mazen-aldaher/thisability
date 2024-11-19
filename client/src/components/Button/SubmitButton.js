import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ loading, children, ...props }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 3,
      mb: 2,
      borderRadius: '25px',
      height: '50px',
      backgroundColor: 'green',
      '&:hover': { backgroundColor: '#45a049' },
    }}
    disabled={loading}
    {...props}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : children}
  </Button>
);

export default SubmitButton;
