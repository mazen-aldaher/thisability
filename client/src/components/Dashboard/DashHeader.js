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

const AppHeader = ({ handleDrawerToggle,unfoldable }) => {
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
        backgroundColor: '#ededed',
        transition: 'margin-left 0.3s', // Smooth transition effect
        }}
    >
      <Container maxWidth="xl" sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
          <Button color="inherit">
            <NavLink
              to="/users"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Users
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              to="/settings"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Settings
            </NavLink>
          </Button>
          <IconButton color="inherit">
            <BellIcon />
          </IconButton>
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* Color Mode Toggle */}
          <IconButton onClick={handleMenuOpen} color="inherit">
            {colorMode === 'dark' ? (
              <DarkMode />
            ) : colorMode === 'auto' ? (
              <Auto />
            ) : (
              <LightMode />
            )}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleColorModeClick('light')}>
              Light
            </MenuItem>
            <MenuItem onClick={() => handleColorModeClick('dark')}>
              Dark
            </MenuItem>
            <MenuItem onClick={() => handleColorModeClick('auto')}>
              Auto
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <AppHeaderDropdown />
        </Toolbar>
      </Container>
      <Container maxWidth="xl" sx={{ px: 4 }}>
        <AppBreadcrumb />
      </Container>
    </AppBar>
  );
};

export default AppHeader;
