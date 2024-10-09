// src/components/SplashScreen.js
import React, { useEffect } from "react";
import "./SplashScreen.css";
import logo from "../assets/Logo.png";
import { Box } from "@mui/material";

const SplashScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1500); // Display splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="splash-screen">
      <Box
        component={"img"}
        src={logo}
        alt="Logo"
        className="splash-logo"
        sx={{ width: "250px" }}
      />
    </div>
  );
};

export default SplashScreen;
