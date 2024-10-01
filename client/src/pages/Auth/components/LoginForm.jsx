import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const data = await login(email, password);
      navigate("/"); // Correctly navigate to the home page
      console.log("Login successful", data);
    } catch (error) {
      setError("Invalid email or password");
      console.error("Error logging in", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
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
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in to Dashboard
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                borderRadius: "25px",
                height: "50px",
                backgroundColor: "green",
              }}
            >
              Login
            </Button>
            <Typography align="center" variant="body2" sx={{ mt: 2 }}>
              Or
            </Typography>
          </Box>
        </Box>
        <Box sx={{ pt: 10, textAlign: "center" }}>
          <Typography>
            Need some help?
            <br />
            <NavLink to="/contact" style={{ textDecoration: 'none', color: 'blue' }}>
              Contact Us
            </NavLink>
          </Typography>
          {/* Add your sign-up link here */}
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <NavLink to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>
              Sign Up
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
