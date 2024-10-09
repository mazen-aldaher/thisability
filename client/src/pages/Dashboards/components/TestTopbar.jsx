import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddBoxIcon,
  NotificationsActiveOutlined as NotificationsIcon,
  MailOutline as MailIcon,
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import ThemeToggleBar from '../../../components/ThemeToggleBar';

const TestTopbar = ({ handleDrawerToggle, open, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState('');
  const drawerWidth = 240;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

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

  // Dummy notifications and messages for testing
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
        sx={{
          zIndex: 1201,
          background: '#4dbd74',
          width: open ? {xl:'86.2%',xs:'87.3%'} : {xl:'100%',xs:"87.3%"},
          backgroundColor: theme.palette.primary.main,
          transition: 'width 10s ease', // Smooth transition
          borderBottom: '1px solid rgba(255, 255, 255, 0.35)', // White border with 35% opacity
        }}
      >
        <Toolbar
          sx={{ justifyContent: isSmallScreen ? 'flex-end' : 'space-between' }}
        >
          {isSmallScreen ? (
            ''
          ) : (
            <>
              {/* Menu Button */}
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                aria-label="open drawer"
                sx={[
                  {
                    marginLeft: '-10px',
                  },
                ]}
              >
                <MenuIcon sx={{ color: '#ededed' }} />
              </IconButton>
            </>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Create Button */}

            {/* Notifications */}
            <IconButton
              color="inherit"
              onClick={(e) => handleMenuOpen(e, 'notifications')}
              aria-label="show notifications"
            >
              <Badge badgeContent={notificationCount} color="success">
                <NotificationsIcon sx={{ color: '#ededed', opacity: '75%' }} />
              </Badge>
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: '#fff', height: '30px', opacity: '35%' }}
              />
            </Box>
            {/* Mail */}
            <IconButton
              color="inherit"
              onClick={(e) => handleMenuOpen(e, 'mail')}
              aria-label="show mails"
            >
              <Badge badgeContent={mailCount} color="success">
                <MailIcon sx={{ color: '#ededed', opacity: '75%' }} />
              </Badge>
            </IconButton>
            <ThemeToggleBar onThemeChange={onThemeChange} />

            {/* Profile */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: '#fff', height: '30px', opacity: '35%' }}
              />
            </Box>
            <IconButton
              sx={{ borderRadius: '18px', backgroundColor: 'transparent' }}
              onClick={(e) => handleMenuOpen(e, 'profile')}
              aria-label="profile"
            >
              <Avatar
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                sx={{}}
              />
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
