import React, { useContext } from 'react';
import {
  Avatar,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  Comment as CommentIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  CreditCard as CreditCardIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const AppHeaderDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit" className="py-0 pe-0">
        {user === user.avatar ? (
          <Avatar />
        ) : (
          <Box sx={{textAlign:"left"}} >
            <Typography sx={{fontSize:"13px"}} >Hello,</Typography>
            <Typography>{user.profile.firstName}</Typography>
          </Box>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        <Typography variant="subtitle1" sx={{ p: 1, fontWeight: 'bold' }}>
          Account
        </Typography>
        <MenuItem>
          <NotificationsIcon fontSize="small" className="me-2" />
          Updates
          <Badge color="info" variant="dot" sx={{ ml: 1 }} />
        </MenuItem>
        <MenuItem>
          <EmailIcon fontSize="small" className="me-2" />
          Messages
          <Badge color="success" variant="dot" sx={{ ml: 1 }} />
        </MenuItem>
        <MenuItem>
          <AssignmentIcon fontSize="small" className="me-2" />
          Tasks
          <Badge color="error" variant="dot" sx={{ ml: 1 }} />
        </MenuItem>
        <MenuItem>
          <CommentIcon fontSize="small" className="me-2" />
          Comments
          <Badge color="warning" variant="dot" sx={{ ml: 1 }} />
        </MenuItem>
        <Divider />
        <Typography variant="subtitle1" sx={{ p: 1, fontWeight: 'bold' }}>
          Settings
        </Typography>
        <MenuItem>
          <PersonIcon fontSize="small" className="me-2" />
          Profile
        </MenuItem>
        <MenuItem>
          <SettingsIcon fontSize="small" className="me-2" />
          Settings
        </MenuItem>
        <MenuItem>
          <CreditCardIcon fontSize="small" className="me-2" />
          Payments
          <Badge color="secondary" variant="dot" sx={{ ml: 1 }} />
        </MenuItem>
        <MenuItem>
          <DescriptionIcon fontSize="small" className="me-2" />
          Projects
          <Badge color="primary" variant="dot" sx={{ ml: 1 }} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ marginRight: '2px' }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppHeaderDropdown;
