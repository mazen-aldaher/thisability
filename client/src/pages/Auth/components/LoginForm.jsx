import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { useNotification } from '../../../context/NotificationContext';
import InputField from '../../../components/InputField';
import SubmitButton from '../../../components/Button/SubmitButton';
import useForm from '../../../hooks/useForm';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { showNotification } = useNotification();
  const { login, loading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, validateForm } = useForm(
    { email: '', password: '' },
    (field, value) => {
      if (!value) return 'This field is required.';
      if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Invalid email format.';
      return null;
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await login(values);

    if (result?.meta?.requestStatus === 'fulfilled') {
      showNotification('Login successful!', 'success');
      setTimeout(() => navigate(from), 1000);
    } else {
      showNotification(result.payload || 'Login failed. Please try again.', 'error');
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
            p: { xs: 2, sm: 4 },
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
            <InputField
              label="Email Address"
              value={values.email}
              onChange={(val) => handleChange('email', val)}
            />
            <InputField
              label="Password"
              type="password"
              value={values.password}
              onChange={(val) => handleChange('password', val)}
              showPasswordToggle
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <SubmitButton loading={loading}>Login</SubmitButton>
          </Box>
        </Box>
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography>
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
