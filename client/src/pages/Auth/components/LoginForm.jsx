import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext"; // Importing AuthContext
import { NavLink, useNavigate } from "react-router-dom"; // Importing necessary hooks
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
} from "@mui/material"; // Material UI components
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Icons

const LoginForm = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state
  const [loginFailed, setLoginFailed] = useState(false); // Track login failure
  const { login } = useContext(AuthContext); // Destructure login function from AuthContext
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return; // Exit if the email is invalid
    }

    try {
      await login(email, password); // Call login function
      setLoginFailed(false); // Reset login failure state on successful login
      navigate("/"); // Navigate to the profile page on success
    } catch (error) {
      // Expanded error handling for network or other issues
      if (error.response) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Network error. Please try again later.");
      }
      setLoginFailed(true); // Set login failure state
      console.error("Error logging in", error); // Log the error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full height for better centering
        backgroundColor: "#f0f2f5",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: 2, sm: 4 },
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            Sign In
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: "gray" }}>
            Access your account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error} {/* Show error message if exists */}
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
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              variant="outlined" // Use outlined variant for better visibility
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }} // Rounded edges
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"} // Conditional password type
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              variant="outlined" // Use outlined variant for better visibility
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }} // Rounded edges
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility} // Toggle password visibility
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />} {/* Show appropriate icon */}
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
                borderRadius: "25px",
                height: "50px",
                backgroundColor: "green",
                '&:hover': {
                  backgroundColor: '#45a049', // Darker shade on hover
                },
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'} {/* Show loading indicator */}
            </Button>
            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
              Or
            </Typography>
          </Box>

          {/* Conditional Rendering of "Forgot Password?" Button */}
          {loginFailed && (
            <Box sx={{ mt: 2 }}>
              <NavLink to="/forgot-password" style={{ textDecoration: 'none', color: 'blue' }}>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Forgot Password?
                </Typography>
              </NavLink>
            </Box>
          )}
        </Box>
        <Box sx={{ pt: 4, textAlign: "center" }}>
          <Typography>
            Need some help?
            <br />
            <NavLink to="/support" style={{ textDecoration: 'none', color: 'blue' }}>
              Contact Us
            </NavLink>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
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
