import { Box } from '@mui/material';
import React, { useState } from 'react';
import {
  DashContent,
  DashFooter,
  DashHeader,
  DashSidebar,
} from '../components/Dashboard';

const DefaultLayout = ({ onThemeChange }) => {
  const [unfoldable, setUnfoldable] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(true);
  const drawerWidth = unfoldable ? 55 : 290;
  

  const handleDrawerToggle = () => {
    setSidebarShow((prev) => !prev); // Toggle sidebar visibility
  };

  const handleUnfoldToggle = () => {
    setUnfoldable((prev) => !prev); // Toggle sidebar unfolding
  };

  

  return (
    <Box sx={{ height: '100vh',display:"flex",flexDirection:"column" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <DashHeader
          handleDrawerToggle={handleDrawerToggle}
          unfoldable={unfoldable}
          onThemeChange={onThemeChange}
        />
      </Box>
      {/* Sidebar Section */}
      <Box sx={{ position: 'relative', zIndex: 0, mr: 5 }}>
        <DashSidebar
          handleDrawerToggle={handleDrawerToggle}
          handleUnfoldToggle={handleUnfoldToggle}
          sidebarShow={sidebarShow}
          unfoldable={unfoldable}
          drawerWidth={drawerWidth}
        />
      </Box>
      {/* Main Content Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: '100vh',
        }}
      >
        {/* Content Section */}
        <Box
          sx={{
            flexGrow: 1,
            p: 0,
            marginLeft: unfoldable ? "5%": sidebarShow ?"18%":"2%",
            transition: 'margin-left 0.4s ease-in-out', // Smooth transition for the marginLeft
          }}
        >
          <DashContent />
        </Box>

        {/* Footer Section */}
        <DashFooter />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
