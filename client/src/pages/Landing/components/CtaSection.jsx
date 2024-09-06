/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import FloatObj from "../../../components/FloatObj";
import mock1 from "../../../assets/ill/mock-1.png";
import mock2 from "../../../assets/ill/mock-2.png";
import ItemsSlider from "../../../components/ItemsSlider";
import CTABTN from "../../../components/Button/CTABTN";

const CtaSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "1000px",
        top: "-20px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: "100vw",
          zIndex: 0,
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          textAlign: { md: "center", xs: "left" },
          color: theme.palette.colortext.main,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <FloatObj front={mock1} canFlip={false} />
          </Box>
          <Box sx={{ textAlign: "center", paddingTop: "5%" }}>
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
              justifyContent: "right",
            }}
          >
            <FloatObj front={mock2} canFlip={false} />
          </Box>
        </Box>
      </Box>

      <Box>
        <Container>
          <Box>
            <Typography
              variant="h5"
              textAlign="center"
              color={theme.palette.secondary.main}
              sx={{ my: 3 }}
            >
              Flip the Card to explore more!
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 5 }}>
            <ItemsSlider />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.secondary.main,
              }}
            >
              Each piece of our collection tells a story. <br /> These artworks
              are expressions of strength, diversity, and the unstoppable
              spirit.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CtaSection;
