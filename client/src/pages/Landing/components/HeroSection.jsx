/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Box } from "@mui/material";
import React from "react";
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

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent:"space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{}}>
          <FloatObj front={ill1} back={fli1} />
        </Box>
        <Box sx={{}}>
          <FloatObj front={ill2} back="" />
        </Box>
        <Box sx={{}}>
          <FloatObj front={ill3} back={fli4} />
        </Box>
        <Box sx={{}}>
          <FloatObj front={ill7} back={fli2} />
        </Box>
      </div>
    </Box>
  );
};

export default HeroSection;
