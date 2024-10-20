import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Extract token from URL
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    // Function to verify email
    const verifyEmailToken = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/user/verify-email", { token });
        setMessage(response.data); // Adjusted to get the message directly from response
        setSuccess(true);
      } catch (error) {
        setMessage(error.response?.data || "Email verification failed."); // Ensure fallback to generic error
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmailToken();
    } else {
      setMessage("Invalid or missing token.");
      setLoading(false);
    }
  }, [token]);

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Verifying email, please wait...
          </Typography>
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mb: 2 }}>
            {success ? "Success!" : "Error"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {message}
          </Typography>
          {success && (
            <Button variant="contained" color="primary" onClick={handleRedirect}>
              Go to Login
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VerifyEmail;
