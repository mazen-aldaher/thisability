
import React from "react";
import { IconButton, Tooltip } from "@mui/material";

const ThemeToggleButton = ({
  themeName,
  activeTheme,
  handleThemeChange,
  icon,
  tooltipTitle,
}) => {
  const getBackgroundColor = () => {
    if (activeTheme !== themeName) return "inherit";

    switch (themeName) {
      case "light":
        return "#3498db";
      case "dark":
        return "#2c3e50";
      case "autism":
        return "#00796b";
      default:
        return "inherit";
    }
  };

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        variant="contained"
        onClick={() => handleThemeChange(themeName)}
        sx={{
          color: activeTheme === themeName ? "#ffffff" : "inherit",
          backgroundColor: getBackgroundColor(),
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
