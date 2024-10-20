import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/user/password-reset-request', { email });
      setSuccess(true);
    } catch (error) {
      setError('Failed to send the password reset email');
      console.error('Error sending email', error);
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
            boxShadow: 8, // Increased shadow for more depth
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
            Forgot Password
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 4, color: 'gray', textAlign: 'center' }}
          >
            Enter your email to receive a password reset link.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Check your email for the password reset link!
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 25 },
                '& label.Mui-focused': { color: '#4CAF50' }, // Green focused label
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  { borderColor: '#4CAF50' }, // Green focused border
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                  { borderColor: '#4CAF50' }, // Green hover border
              }}
            />
            <Button
              type="submit"
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
                  transform: 'scale(1.02)', // Subtle scaling on hover
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </Box>
          <Typography sx={{ mt: 2, color: 'gray', textAlign: 'center' }}>
            Remembered your password?{' '}
            <NavLink
              to="/login"
              style={{ textDecoration: 'none', color: '#2196F3', fontWeight: 'bold' }} // Changed link color
            >
              Log In
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
