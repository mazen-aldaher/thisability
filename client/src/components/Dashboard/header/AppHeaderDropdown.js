import React from 'react';
import {
  Avatar,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Typography,
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
  Lock as LockIcon,
} from '@mui/icons-material';


const AppHeaderDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit" className="py-0 pe-0">
        <Avatar />
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
        <MenuItem>
          <LockIcon fontSize="small" className="me-2" />
          Lock Account
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppHeaderDropdown;
