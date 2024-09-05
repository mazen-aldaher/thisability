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
    <>
      <Box sx={{}}>
        <Box
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: { xl: "space-between", md: "center" },
            alignItems: "center",
            height: "80vh",
            paddingTop: "0vh",
            width: "95%",
          }}
        >
          <Box sx={{ paddingRight: "2%", mt: 5 }}>
            <FloatObj front={ill1} back={fli1} />
          </Box>
          <Box>
            <Box>
              <FloatObj front={ill2} back={ill2} />
            </Box>
            <Box sx={{ marginLeft: "0%" }}>
              <FloatObj front={ill5} back={fli5} />
            </Box>
          </Box>
          <Box sx={{ marginLeft: "1%", marginTop: "0%" }}>
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
          <Box sx={{ paddingLeft: { xl: "0%" }, marginTop: 5 }}>
            <FloatObj front={ill4} back={fli3} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: {xl:"100vw"},
          zIndex: 1,
          position: "relative",
          minHeight: "40vh",
          mt: "-10%",
          alignContent: "flex-start",
          p: 8,
          textAlign:{md:"center",xs:"left"}
        }}
      >
        <Box>
          <Typography variant="h2">
            Know me for my Ability, not my Disability
          </Typography>
        </Box>
        <Box>
          <CTABTN title ="Shop Know" link="/"/>
        </Box>
      </Box>
    </>
  );
};

export default BeforeHero;
