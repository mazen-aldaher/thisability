import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material"; // Material UI components
import { NavLink, useNavigate } from "react-router-dom"; // Importing necessary hooks

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State for email
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // State for successful submission

  const navigate = useNavigate(); // useNavigate for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return; // Exit if the email is invalid
    }

    try {
      // Simulate an API call to send the password reset email
      await fakeApiCall(email); // Replace with your API call
      setSuccess(true); // Set success state on successful email submission
    } catch (error) {
      setError("Failed to send the password reset email"); // Set error message on failure
      console.error("Error sending email", error); // Log the error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Simulated API call function (replace with actual API call)
  const fakeApiCall = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful response
        Math.random() > 0.2 ? resolve() : reject(new Error("API error"));
      }, 1000);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100vh",
        pt:5,
        backgroundColor: "#f0f2f5", // Light gray background
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: 3, sm: 5 },
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            border: "1px solid #e0e0e0", // Subtle border
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
            Forgot Password
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3, color: "gray", textAlign: "center" }}>
            Enter your email to receive a password reset link.
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
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Check your email for the password reset link! {/* Show success message */}
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
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 25 },
                '& label.Mui-focused': { color: 'green' }, // Focused label color
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green', // Focused border color
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green', // Hover border color
                },
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'} {/* Show loading indicator */}
            </Button>
          </Box>
          <Typography sx={{ mt: 2, color: "gray" }}>
            Remembered your password?{" "}
            <NavLink to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
              Log In
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
