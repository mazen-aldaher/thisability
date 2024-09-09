
import React from "react";
import { Box, IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const VerticalDotsNavigation = ({
  sections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        right: 20,
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {sections.map((section) => (
        <IconButton
          key={section}
          onClick={() => onSectionClick(section)}
          sx={{
            color: activeSection === section ? "primary.main" : "grey.500",
            transform: activeSection === section ? "scale(1)" : "scale(0.75)",
            transition: "transform 0.3s ease, color 0.3s ease",
            willChange: "transform",
          }}
        >
          <FiberManualRecordIcon />
        </IconButton>
      ))}
    </Box>
  );
};

export default VerticalDotsNavigation;
