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
  SwipeableDrawer,
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
      onLanguageChange(selectedLanguage);
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
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: "row", sm: "row" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            sx={{
              color: "inherit",
              bgcolor: "background.paper",
              width: { xs: "100%", sm: "auto", md: "110px" },
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
                  flexDirection: { xs: "row", sm: "row" },
                  width: "100%",
                }}
              >
                <Button
                  color="inherit"
                  fullWidth
                  onClick={() => navigate("/signin")}
                >
                  {t`Sign In`}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={() => navigate("/register")}
                >
                  {t`Register`}
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
                </Avatar>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button color="inherit" onClick={() => navigate("/signin")}>
                    {t`Sign In`}
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate("/register")}
                  >
                    {t`Register`}
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

      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
            borderRadius: "0 10px 10px 0", // Rounded edge
            visibility: drawerOpen ? "visible" : "hidden", // Make the drawer edge visible
          },
        }}
        PaperProps={{
          style: {
            overflow: "hidden", // Hide the drawer's edge until it's opened
          },
        }}
      >
        <Box
          sx={{
            width: "250px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                <ListItemText primary={t(item.title)} />
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
                <ListItemText primary={t`Sign In`} />
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
                <ListItemText primary={t`Register`} />
              </ListItem>
            )}
          </List>
        </Box>
      </SwipeableDrawer>

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
