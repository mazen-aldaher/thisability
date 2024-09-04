/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTranslation } from "react-i18next";
import ThemeToggleBar from "../ThemeToggleBar";
import logo from "../../assets/Logo.png";

const data = [
  { title: "About Us", link: "/about-us" },
  { title: "Store", link: "/store" },
  { title: "Community", link: "/blog" },
  { title: "Support", link: "/contact-us" },
  { title: "FAQ", link: "/faq" },
];

const Header = ({ onThemeChange, onLanguageChange, isAuthenticated }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
    setShowBackToTop(window.scrollY > 300);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    if (onLanguageChange) {
      onLanguageChange(selectedLanguage); // Call the function only if it's defined
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ display: "flex", my: 1 }}>
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 }, // Reduce gap for xs screens
            flexDirection: { xs: "row", sm: "row" }, // Stack items vertically on xs screens
            width: { xs: "100%", sm: "auto" }, // Full width for xs screens
          }}
        >
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            sx={{
              color: "inherit",
              bgcolor: "background.paper",
              width: { xs: "100%", sm: "auto", md: "110px" }, // Full width on xs screens
              height: "40px",
            }}
          >
            <MenuItem value="en">
              <Typography sx={{ variant: { xs: "body2" } }}>English</Typography>
            </MenuItem>
            <MenuItem value="es">
              <Typography variant="body2">Español</Typography>
            </MenuItem>
            <MenuItem value="fr">
              <Typography variant="body2">Français</Typography>
            </MenuItem>
            <MenuItem value="ar">
              <Typography variant="body2">العربية</Typography>
            </MenuItem>
          </Select>

          <ThemeToggleBar onThemeChange={onThemeChange} />

          <Box sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            {isAuthenticated ? (
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  width: { xs: "40px", sm: "auto" },
                  height: { xs: "40px", sm: "auto" },
                }}
              >
                U
              </Avatar>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "row", sm: "row" }, // Stack buttons vertically on xs screens
                  width: "100%",
                }}
              >
                <Button
                  color="inherit"
                  fullWidth // Full width on xs screens
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth // Full width on xs screens
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <AppBar
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          transition: "background-color 0.3s ease, color 0.3s ease",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          backgroundColor: scrolled
            ? theme.palette.primary
            : theme.palette.primary,
          color: scrolled ? "#fff" : "inherit",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <NavLink to="/">
                <Box
                  component="img"
                  src={logo}
                  alt="Thisability Logo"
                  sx={{ height: "60px" }}
                />
              </NavLink>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
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
                        ? theme.palette.warning.main
                        : "inherit",
                  }}
                >
                  <Typography variant="navtext">{t(item.title)}</Typography>
                </Button>
              ))}

              {isAuthenticated ? (
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  U
                </Avatar> // Replace "U" with the user's initial or actual avatar
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button color="inherit" onClick={() => navigate("/signin")}>
                    Sign In
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>

            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {data.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                navigate(item.link);
                handleDrawerToggle();
              }}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          {!isAuthenticated && (
            <ListItem
              button
              onClick={() => {
                navigate("/signin");
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
          {!isAuthenticated && (
            <ListItem
              button
              onClick={() => {
                navigate("/register");
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Register" />
            </ListItem>
          )}
        </List>
      </Drawer>

      {showBackToTop && (
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1100,
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </>
  );
};

export default Header;
