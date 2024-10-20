import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const token = new URLSearchParams(location.search).get('token');
    setLoading(true);
    setError(null); // Reset error state

    try {
      await axios.post(`http://localhost:5000/api/user/reset-password?token=${token}`, { newPassword });
      setSuccess(true);
      navigate('/login')
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to reset password. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100vh',
        pt: 5,
        backgroundColor: '#f0f2f5',
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: 4, sm: 6 },
            boxShadow: 8,
            borderRadius: 3,
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}
          >
            Reset Password
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 4, color: 'gray', textAlign: 'center' }}
          >
            Please enter your new password.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset successfully!
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 25 },
              '& label.Mui-focused': { color: '#4CAF50' },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                { borderColor: '#4CAF50' },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                { borderColor: '#4CAF50' },
            }}
          />
          <Button
            onClick={handleResetPassword}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 25,
              height: '50px',
              backgroundColor: '#4CAF50',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              '&:hover': {
                backgroundColor: '#45a049',
                transform: 'scale(1.02)',
              },
              '&:disabled': {
                backgroundColor: '#a5d6a7',
              },
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Reset Password'
            )}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPassword;
