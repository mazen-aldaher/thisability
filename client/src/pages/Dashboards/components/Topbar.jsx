import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Switch, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle as AccountCircleIcon,

} from '@mui/icons-material';
const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState('');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleRtlToggle = () => {
    setRtl(!rtl);
  };
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
    <AppBar position="fixed" sx={{ zIndex: 1201, background: '#1976d2' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Buyer Dashboard
        </Typography>
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
          {/* Profile */}
          <IconButton
            color="inherit"
            onClick={(e) => handleMenuOpen(e, 'profile')}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* RTL Toggle Switch */}
          <Button color="inherit">{rtl ? 'LTR' : 'RTL'}</Button>
          <Switch checked={rtl} onChange={handleRtlToggle} />
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
  );
};

export default Topbar;
