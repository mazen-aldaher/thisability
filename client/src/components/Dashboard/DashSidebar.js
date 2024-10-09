import React from 'react';
import { Drawer, IconButton, Toolbar, Divider, List, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoIcon from '@mui/icons-material/AccountTree'; // Replace with your actual logo icon
import SygnetIcon from '@mui/icons-material/AcUnit'; // Replace with your actual sygnet icon
import { AppSidebarNav } from './AppSidebarNav';
import navigation from '../../_nav'; // Sidebar nav config

const AppSidebar = ({
  handleDrawerToggle,
  handleUnfoldToggle,
  sidebarShow,
  unfoldable,
}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarShow}
      onClose={handleDrawerToggle}
      sx={{
        width: unfoldable ? 80 : 250, // Adjust the width based on the 'unfoldable' state
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: unfoldable ? 80 : 250, // Consistent width for the Drawer content
          boxSizing: 'border-box', // Maintain consistent box sizing
        },
      }}
    >
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <IconButton edge="start">
            <LogoIcon fontSize="large" /> {/* Replace with actual logo */}
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDrawerToggle}
            className="d-lg-none"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Divider />

      <List>
        <AppSidebarNav items={navigation} />
      </List>

      <Divider />

      <Toolbar>
        <IconButton onClick={handleUnfoldToggle}>
          {unfoldable ? <MenuIcon /> : <SygnetIcon />} {/* Replace icons */}
        </IconButton>
      </Toolbar>
    </Drawer>
  );
};

export default React.memo(AppSidebar);
