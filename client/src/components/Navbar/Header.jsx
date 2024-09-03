/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import ThemeToggleBar from "../ThemeToggleBar";

const data = [
  { title: "About Us", link: "/about-us" },
  { title: "Store", link: "/store" },
  { title: "Community", link: "/blog" },
  { title: "Support", link: "/contact-us" },
  { title: "FAQ", link: "/faq" },
];

const Header = ({ onThemeChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme(); // Access the current theme

  return (
    <>
      <Container maxWidth="xl" sx={{ display: "flex", my: 1 }}>
        <Box sx={{ ml: "auto" }}>
          <ThemeToggleBar onThemeChange={onThemeChange} />
        </Box>{" "}
      </Container>
      <AppBar
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          right: 0,
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {/* Logo and navigation links */}
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <NavLink to="/">
                <Box
                  component="img"
                  src="/path-to-your-logo.png" // Replace with actual logo path
                  alt="Thisability Logo"
                  sx={{ height: "60px" }}
                />
              </NavLink>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {data.map((item) => (
                <Button
                  key={item.link}
                  color="inherit"
                  onClick={() => navigate(item.link)}
                  sx={{
                    color:
                      location.pathname === item.link
                        ? theme.palette.secondary.main
                        : "inherit",
                  }}
                >
                  <Typography variant="navtext">{item.title}</Typography>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
