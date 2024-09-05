/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Keyframes for combined floating animation
const float = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
`;

const FlippingCardContainer = styled(Box)(({ theme }) => ({
  perspective: "1000px",
  width: "300px",
  height: "400px",
  animation: `${float} 4s ease-in-out infinite`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const FlippingCardInner = styled(Box)(({ isFlipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  backfaceVisibility: "hidden",
}));

const FlippingCardFace = styled(Box)(({ theme, back }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: back ? "theme.palette.primary.main" : "transparent",
  transform: back ? "rotateY(180deg)" : "none",
}));

const FloatObj = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme(); // Correctly use useTheme inside the component

  useEffect(() => {
    const flipInterval = setInterval(
      () => {
        setIsFlipped((prev) => !prev);
      },
      Math.random() * (5000 - 2000) + 2000
    ); // Random interval between 2s and 5s

    return () => clearInterval(flipInterval); // Clean up interval on component unmount
  }, []);

  return (
    <FlippingCardContainer>
      <FlippingCardInner isFlipped={isFlipped}>
        <FlippingCardFace>
          <Box>
            <Box sx={{ paddingY: "20px" }}>
              <Box
                component="img"
                src={front}
                alt="Front Side"
                sx={{ width: { xl: "250px", md: "200px" } }}
              />
            </Box>
          </Box>
        </FlippingCardFace>
        {/* Back Face */}
        <FlippingCardFace back>
          <Box>
            <Box
              component="img"
              src={back}
              alt="Back Side"
              sx={{ width: { xl: "250px", md: "200px" } }}
            />
          </Box>
        </FlippingCardFace>
      </FlippingCardInner>
    </FlippingCardContainer>
  );
};

export default FloatObj;
