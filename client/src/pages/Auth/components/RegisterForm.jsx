import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (where the user was)

  // Get the URL to redirect back to
  const from = location.state?.from?.pathname || '/'; // Default to home page if no previous page

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages(); // Reset any existing messages
    setLoading(true); // Set loading state

    if (!validateForm()) {
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const response = await register(username, email, password);
      if (response && (response.status === 201 || response.status === 200)) {
        setNotification({
          type: 'success',
          message: 'Registration successful! Redirecting...',
        });

        setTimeout(() => navigate(from), 1000); // Redirect back to the page the user was on
      } else {
        setNotification({
          type: 'error',
          message: 'Unexpected response. Please try again.',
        });
      }
    } catch (error) {
      handleError(error); // Handle errors based on response
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  const resetMessages = () => {
    setNotification(null); // Reset notification state
  };

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setNotification({ type: 'error', message: 'All fields are required.' });
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return false;
    }

    if (password !== confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match.' });
      return false;
    }

    return true;
  };

  const handleError = (error) => {
    console.error('Registration error: ', error);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setNotification({
            type: 'error',
            message: 'Invalid input. Please check your data.',
          });
          break;
        case 409:
          setNotification({
            type: 'error',
            message: 'User already exists. Please use a different email.',
          });
          break;
        case 500:
          setNotification({
            type: 'error',
            message: 'Server error. Please try again later.',
          });
          break;
        default:
          setNotification({
            type: 'error',
            message: 'An unexpected error occurred. Please try again later.',
          });
      }
    } else {
      setNotification({
        type: 'error',
        message: 'Network error. Please check your connection.',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
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
            Sign Up
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: 'gray' }}>
            Create your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            {notification && <Alert severity={notification.type} sx={{ mb: 2 }}>{notification.message}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility} edge="end">
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
              Or
            </Typography>
          </Box>

          <Box sx={{ pt: 4, textAlign: 'center' }}>
            <Typography>
              Already have an account?{' '}
              <NavLink to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
                Sign In
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterForm;
