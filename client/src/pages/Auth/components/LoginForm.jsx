import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNotification } from '../../../context/NotificationContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { showNotification } = useNotification();
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await login(email, password);
      if (response?.status === 200 || response?.status === 204) {
        showNotification('Login successful!', 'success');
        setTimeout(() => navigate(from), 1000);
      } else {
        showNotification('Unexpected response. Please try again.', 'error');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      showNotification('Both email and password are required.', 'error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return false;
    }
    return true;
  };

  const handleError = (error) => {
    console.error('Login error:', error);
    const errorMessage = error.response?.status === 401
      ? 'Invalid email or password, or account might be suspended.'
      : error.response?.status === 500
      ? 'Server error. Please try again later.'
      : 'An unexpected error occurred. Please try again.';
    showNotification(errorMessage, 'error');
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Container component="main" maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 2, sm: 4 }, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>Sign In</Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: 'gray' }}>Access your account</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
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
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
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
              sx={{ mt: 3, mb: 2, borderRadius: '25px', height: '50px', backgroundColor: 'green', '&:hover': { backgroundColor: '#45a049' } }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
            <Box sx={{ mt: 2 }}>
              <NavLink to="/forgot-password" style={{ textDecoration: 'none', color: 'blue' }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>Forgot Password?</Typography>
              </NavLink>
            </Box>
          </Box>
        </Box>
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography>
            Need some help?
            <br />
            <NavLink to="/support" style={{ textDecoration: 'none', color: 'blue' }}>Contact Us</NavLink>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <NavLink to="/register" style={{ textDecoration: 'none', color: 'blue' }}>Sign Up</NavLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
