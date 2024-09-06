/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
// BeforeHero.js
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FloatObj from "../../../components/FloatObj";
import ill1 from "../../../assets/ill/ill-1.png";
import ill2 from "../../../assets/ill/ill-2.png";
import ill3 from "../../../assets/ill/ill-3.png";
import ill4 from "../../../assets/ill/ill-4.png";
import ill5 from "../../../assets/ill/ill-5.png";
import ill6 from "../../../assets/ill/ill-6.png";
import ill7 from "../../../assets/ill/ill-7.png";
import fli1 from "../../../assets/ill/art-ist/flip-1.png";
import fli2 from "../../../assets/ill/art-ist/flip-2.png";
import fli3 from "../../../assets/ill/art-ist/flip-3.png";
import fli4 from "../../../assets/ill/art-ist/flip-4.png";
import fli5 from "../../../assets/ill/art-ist/flip-5.png";
import CTABTN from "../../../components/Button/CTABTN";

const BeforeHero = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xl: "space-between", md: "space-between" },
            alignItems: "center",
            alignContent: "flex-start",
            width: { xl: "100vw", md: "auto" },
            margin: "auto",
            height: "100vh",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ paddingRight: { xl: "2%" }, mt: 5 }}>
              <FloatObj front={ill1} back={fli1} />
            </Box>
            <Box>
              <Box>
                <FloatObj front={ill2} back={ill2} />
              </Box>
              <Box>
                <FloatObj front={ill5} back={fli5} />
              </Box>
            </Box>
            <Box sx={{ marginLeft: { xl: "1%" }, marginTop: "0%" }}>
              <FloatObj front={ill3} back={ill3} />
            </Box>
            <Box>
              <Box sx={{ marginLeft: { xl: "10%" }, marginTop: "-10%" }}>
                <FloatObj front={ill7} back={fli2} />
              </Box>
              <Box sx={{ marginLeft: { xl: "10%" }, paddingTop: "0%" }}>
                <FloatObj front={ill6} back={ill6} />
              </Box>
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <FloatObj front={ill4} back={fli3} />
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: "100vw",
              zIndex: 1,
              position: "relative",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
              p: 8,
              textAlign: { md: "center", xs: "left" },
              color: theme.palette.colortext.main,
              top: { xl: "-30%", lg: "-35%", md: "-40%" },
              pb: 10,
            }}
          >
            <Box>
              <Typography variant="h2">
                Know me for my Ability, not my Disability
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box sx={{ textAlign: "center", paddingTop: "2%" }}>
                <Box>
                  <CTABTN title="Shop Know" link="/" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BeforeHero;
