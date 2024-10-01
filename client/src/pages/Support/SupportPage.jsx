import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";

const SupportPage = () => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiryType, setInquiryType] = useState(""); // Default value is an empty string
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    // For example:
    // fetch('API_ENDPOINT', { method: 'POST', body: JSON.stringify({ name, email, message, inquiryType }) })
    //   .then(response => response.json())
    //   .then(data => setSuccess(true))
    //   .catch(err => console.error(err));

    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setInquiryType("");
  };

  const speak = (text) => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: "bold" }}>
        Support & Inquiries
      </Typography>

      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          We're here to help!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          If you have any questions or need assistance, please fill out the form below, and we will get back to you as soon as possible.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Button onClick={() => speak(name)} sx={{ mt: 1 }} aria-label="Speak name">
                Speak
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button onClick={() => speak(email)} sx={{ mt: 1 }} aria-label="Speak email">
                Speak
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Inquiry Type</InputLabel>
                <Select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  label="Inquiry Type"
                >
                  <MenuItem value="needMoreInfo">Need More Info</MenuItem>
                  <MenuItem value="trackProduct">Track Product</MenuItem>
                  <MenuItem value="haveIdea">Have an Idea</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={() => speak(inquiryType)} sx={{ mt: 1 }} aria-label="Speak inquiry type">
                Speak
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button onClick={() => speak(message)} sx={{ mt: 1 }} aria-label="Speak message">
                Speak
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ color: theme.palette.secondary.main }}
            >
              Send Inquiry
            </Button>
          </Box>
        </form>

        {success && (
          <Typography variant="body2" sx={{ mt: 2, color: "green" }}>
            Your inquiry has been sent successfully!
          </Typography>
        )}
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Contact Us</Typography>
        <Typography variant="body1">Email: support@example.com</Typography>
        <Typography variant="body1">Phone: +1 (555) 012-3456</Typography>
      </Box>
    </Container>
  );
};

export default SupportPage;
