/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import TestTopbar from './components/TestTopbar';

const DashboardLayout = ({ children, onThemeChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  const theme = useTheme();
  // Toggle the drawer's open/close state
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        handleDrawerOpen={handleDrawerToggle}
        open={drawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <TestTopbar
        handleDrawerToggle={handleDrawerToggle}
        open={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        onThemeChange={onThemeChange}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#323a49',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            p: 0,
            marginLeft: '50px', // Adjust this based on Sidebar width
            marginTop: '90px', // Adjust this based on Topbar height
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
