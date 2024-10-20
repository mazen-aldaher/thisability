import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Alert, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the URL to redirect back to
  const from = location.state?.from?.pathname || '/'; // Default to home page if no previous page

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      if (response && (response.status === 200 || response.status === 204)) {
        setNotification({ type: 'success', message: 'Login successful!' });
        setTimeout(() => navigate(from), 1000); // Redirect back to the page the user was on
      } else {
        setNotification({ type: 'error', message: 'Unexpected response. Please try again.' });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const resetMessages = () => {
    setNotification(null);
  };

  const validateForm = () => {
    if (!email || !password) {
      setNotification({ type: 'error', message: 'Both email and password are required.' });
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setNotification({ type: 'error', message: 'Please enter a valid email address.' });
      return false;
    }
    return true;
  };

  const handleError = (error) => {
    console.error("Login error: ", error); // Log the error for debugging
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setNotification({ type: 'error', message: 'Missing email or password.' });
          break;
        case 401:
          setNotification({ type: 'error', message: 'Invalid email or password. Please try again.' });
          break;
        case 403:
          setNotification({ type: 'error', message: 'Your account is not activated. Please check your email.' });
          break;
        case 500:
          setNotification({ type: 'error', message: 'Server error. Please try again later.' });
          break;
        default:
          setNotification({ type: 'error', message: 'An unexpected error occurred. Please try again later.' });
      }
    } else {
      setNotification({ type: 'error', message: 'Network error. Please check your connection.' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: 2, sm: 4 },
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            Sign In
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: 'gray' }}>
            Access your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            {notification && (
              <Alert severity={notification.type} sx={{ mb: 2 }}>
                {notification.message}
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
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
            <Box sx={{ mt: 2 }}>
              <NavLink to="/forgot-password" style={{ textDecoration: 'none', color: 'blue' }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Forgot Password?
                </Typography>
              </NavLink>
            </Box>
          </Box>
        </Box>
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography>
            Need some help?
            <br />
            <NavLink to="/support" style={{ textDecoration: 'none', color: 'blue' }}>
              Contact Us
            </NavLink>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <NavLink to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
              Sign Up
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
