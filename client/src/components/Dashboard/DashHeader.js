import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import {
  NotificationsActiveOutlined as BellIcon,
  List as ListIcon,
  Mail as MailIcon,
  DarkMode,
  LightMode,
  AutoMode as Auto,
} from '@mui/icons-material';
import AppBreadcrumb from '../AppBreadcrumb';
import AppHeaderDropdown from './header/AppHeaderDropdown';
import ThemeToggleBar from '../ThemeToggleBar';

const AppHeader = ({ handleDrawerToggle, unfoldable, onThemeChange }) => {
  const headerRef = useRef(null);
  const [colorMode, setColorMode] = useState('light');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('shadow-sm', window.scrollY > 0);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleColorModeClick = (mode) => {
    setColorMode(mode);
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      ref={headerRef}
      sx={{
        mb: 4,
        p: 0,

        transition: 'margin-left 0.3s', // Smooth transition effect
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ marginInlineStart: '-14px' }}
          >
            <ListIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <NavLink
              to="/dashboard"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Dashboard
            </NavLink>
          </Typography>
          <Container
            maxWidth="xl"
            sx={{ px: 4, display: { md: 'flex', sm: 'none', xs: 'none' } }}
          >
            <AppBreadcrumb />
          </Container>

          <IconButton color="inherit">
            <BellIcon />
          </IconButton>
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* Color Mode Toggle */}
          <ThemeToggleBar onThemeChange={onThemeChange} />

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <AppHeaderDropdown />
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default AppHeader;
