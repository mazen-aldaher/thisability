/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const CTABTN = ({ link, title }) => {
  const theme = useTheme(); // useTheme provides the full theme object
  const mode = theme.palette.mode;

  // Define color based on the theme mode (light, dark, autism)
  const getColorByTheme = () => {
    switch (mode) {
      case "light":
        return "#fff";
      case "dark":
        return "#fff";
      case "autism": // If using a custom theme mode for autism
        return theme.palette.primary.main;
      default:
        return "#fff"; // Default to white if mode is not detected
    }
  };

  return (
    <Box>
      <NavLink to={link} style={{ textDecoration: "none" }}>
        <Button variant="CTA" sx={{ p: 2, minWidth: "200px" }}>
          <Typography variant="navtext" color={getColorByTheme()}>
            {title}
          </Typography>
        </Button>
      </NavLink>
    </Box>
  );
};

export default CTABTN;
