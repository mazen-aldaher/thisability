import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddBoxIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import logo from '../../../assets/Logo.png';
const TestTopbar = () => {
  const [open, setOpen] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState('');

  // Handle menu open
  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType('');
  };
  const handleRtlToggle = () => {
    setRtl(!rtl);
  };
  // Dummy notification and message counts
  const notificationCount = 3;
  const mailCount = 5;
  // Dummy notifications/messages for API calls
  const notifications = [
    { id: 1, message: 'New order placed.' },
    { id: 2, message: 'Your profile was viewed.' },
    { id: 3, message: 'System update available.' },
  ];

  const messages = [
    { id: 1, sender: 'John Doe', subject: 'Hello!' },
    { id: 2, sender: 'Jane Smith', subject: 'Meeting at 3PM' },
    { id: 3, sender: 'Michael Brown', subject: 'Project Update' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, background: '#4dbd74', py: 1 }}
      >
        <Box sx={{ backgroundColor: '#fff', height: '10px' }} />
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <IconButton>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <Button
                variant="contained"
                sx={{ color: '#4dbd74', backgroundColor: '#fff' }}
                endIcon={<AddBoxIcon />}
              >
                Create
              </Button>
            </Box>

            <Box sx={{ marginLeft: 'auto' }}>
              {/* Notifications */}
              <IconButton
                color="inherit"
                onClick={(e) => handleMenuOpen(e, 'notifications')}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {/* Mail */}
              <IconButton
                color="inherit"
                onClick={(e) => handleMenuOpen(e, 'mail')}
              >
                <Badge badgeContent={mailCount} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Box>
            <IconButton
              sx={{ borderRadius: '18px', backgroundColor: 'transparent' }}
              onClick={(e) => handleMenuOpen(e, 'profile')}
            >
              <Box>
                <Avatar sx={{ width: '30px', height: '30px' }} />
              </Box>
              <Box sx={{ pl: 1 }}>
                <Typography variant="body1" noWrap>
                  Mazen
                </Typography>
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
        {/* Menu for notifications, mail, profile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {menuType === 'notifications' &&
            notifications.map((notification) => (
              <MenuItem key={notification.id}>{notification.message}</MenuItem>
            ))}
          {menuType === 'mail' &&
            messages.map((message) => (
              <MenuItem key={message.id}>
                {message.sender}: {message.subject}
              </MenuItem>
            ))}
          {menuType === 'profile' && (
            <>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </>
          )}
        </Menu>
      </AppBar>
    </>
  );
};

export default TestTopbar;
