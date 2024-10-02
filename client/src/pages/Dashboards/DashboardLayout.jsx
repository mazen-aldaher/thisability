import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TestTopbar from "./components/TestTopbar";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TestTopbar />
      {/*<Sidebar />*/}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: "240px", // Adjust this based on Sidebar width
          marginTop: "64px", // Adjust this based on Topbar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
