import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import logo from "../../assets/Logo.png";

const Footer = () => {
  const theme = useTheme(); // Access the theme

  return (
    <div>
      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main, // Use primary color for background
          color: theme.palette.common.white, // White text color
          paddingY: "20px",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body1">
            © {new Date().getFullYear()} Thisability. All rights reserved.
          </Typography>

          <img src={logo} alt="Thisability Logo" style={{ width: "100px" }} />
        </Container>
      </Box>
      {/* End of Footer */}
    </div>
  );
};

export default Footer;
