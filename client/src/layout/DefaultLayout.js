import { Box } from '@mui/material';
import React, { useState } from 'react';
import {
  DashContent,
  DashFooter,
  DashHeader,
  DashSidebar,
} from '../components/Dashboard';

const DefaultLayout = () => {
  const [unfoldable, setUnfoldable] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(true);

  const handleDrawerToggle = () => {
    setSidebarShow((prev) => !prev);  // Toggle sidebar visibility
  };

  const handleUnfoldToggle = () => {
    setUnfoldable((prev) => !prev);  // Toggle sidebar unfolding
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Section */}
      <DashSidebar
        handleDrawerToggle={handleDrawerToggle}
        handleUnfoldToggle={handleUnfoldToggle}
        sidebarShow={sidebarShow}
        unfoldable={unfoldable}
      />
      
      {/* Main Content Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: '100vh',
        }}
      >
        {/* Header Section */}
        <DashHeader handleDrawerToggle={handleDrawerToggle} unfoldable={unfoldable} />

        {/* Content Section */}
        <Box sx={{ flexGrow: 1 }}>
          <DashContent />
        </Box>

        {/* Footer Section */}
        <DashFooter />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
