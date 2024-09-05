/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
// Section.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const Section = ({ id, backgroundImage, children }) => {
  const theme = useTheme(); // Access the theme object

  return (
    <Box
      id={id}
      component={motion.div}
      sx={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>{children}</Box>
    </Box>
  );
};

export default Section;
