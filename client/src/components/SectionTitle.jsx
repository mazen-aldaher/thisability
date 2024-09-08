import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import mock1 from "../assets/ill/mock-1.png";
import mock2 from "../assets/ill/mock-2.png";
import FloatObj from "./FloatObj";

const SectionTitle = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        top: "-20px",
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: "100%",
          zIndex: 0,
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          textAlign: { md: "center", xs: "left" },
          color: theme.palette.colortext.main,
          flexDirection: {
            xs: "column", // Change to column on small screens
            md: "row", // Keep row layout for medium and larger screens
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column", // Stack items vertically on small screens
              md: "row", // Align items horizontally on medium and larger screens
            },
            width: "100%", // Ensure full width
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "center", // Center content horizontally on small screens
                md: "left", // Align left on larger screens
              },
              marginBottom: { xs: 3, md: 0 }, // Add margin for spacing in mobile view
            }}
          >
            <FloatObj front={mock1} canFlip={false} />
          </Box>

          <Box
            sx={{
              textAlign: "center",
              paddingTop: { xs: "2%", md: "5%" }, // Adjust padding for mobile and desktop
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                color: "#fff",
                lineHeight: "5rem",
              }}
            >
              Ready to Discover <br /> Our ThisAbility Artists?
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "center", // Center content horizontally on small screens
                md: "right", // Align right on larger screens
              },
              marginTop: { xs: 3, md: 0 }, // Add margin for spacing in mobile view
            }}
          >
            <FloatObj front={mock2} canFlip={false} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionTitle;
