/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box } from "@mui/material";
import LightIcon from "@mui/icons-material/Light";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { toast } from "react-toastify";
import ThemeToggleButton from "./Button/ThemeToggleButton";
import { autismTheme, darkTheme, lightTheme } from "../theme";

const ThemeToggleBar = ({ onThemeChange }) => {
  const [activeTheme, setActiveTheme] = useState("light");

  const handleThemeChange = (themeName) => {
    let selectedTheme;
    switch (themeName) {
      case "light":
        selectedTheme = lightTheme;
        break;
      case "dark":
        selectedTheme = darkTheme;
        break;
      case "autism":
        selectedTheme = autismTheme;
        break;
      default:
        selectedTheme = lightTheme;
    }

    onThemeChange(selectedTheme);
    setActiveTheme(themeName);
    // Notify theme change
    toast.success(
      `Theme changed to ${
        themeName === "dark"
          ? "Dark"
          : themeName === "light"
            ? "Light"
            : themeName === "autism"
              ? "Comfort"
              : themeName
      }!`,
      { position: "bottom-left" }
    );
  };

  return (
    <Box gap={1} sx={{ display: "flex", justifyContent: "center" }}>
      <ThemeToggleButton
        themeName="light"
        activeTheme={activeTheme}
        handleThemeChange={handleThemeChange}
        icon={<LightIcon />}
        tooltipTitle="Light Theme"
      />
      <ThemeToggleButton
        themeName="dark"
        activeTheme={activeTheme}
        handleThemeChange={handleThemeChange}
        icon={<DarkModeIcon />}
        tooltipTitle="Dark Theme"
      />
      <ThemeToggleButton
        themeName="autism"
        activeTheme={activeTheme}
        handleThemeChange={handleThemeChange}
        icon={<SelfImprovementIcon />}
        tooltipTitle="Autism Theme"
      />
    </Box>
  );
};

export default ThemeToggleBar;
