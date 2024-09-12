import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
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

// Flipping card container with responsive width
const FlippingCardContainer = styled(Box)(({ theme }) => ({
  perspective: "1000px",
  height: "400px",
  animation: `${float} 4s ease-in-out infinite`,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    width: "250px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("md")]: {
    width: "250px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "250px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "300px",
  },
}));

// Inner card with flip behavior
const FlippingCardInner = styled(Box)(({ isflipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  willChange: "transform",
  transformStyle: "preserve-3d",
  transform: isflipped ? "rotateY(180deg)" : "rotateY(0deg)",
  backfaceVisibility: "hidden",
}));

// Front and back card faces
const FlippingCardFace = styled(Box)(({ back }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: back ? "transparent" : "",
  transform: back ? "rotateY(180deg)" : "none",
}));

// Main component with flipping logic
const FloatObj = ({ front, back, canFlip, xl = "300px", md = "200px", lg, xs }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (canFlip) {
      const flipInterval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, Math.random() * (5000 - 2000) + 2000); // Random interval between 2s and 5s

      return () => clearInterval(flipInterval); // Cleanup interval on unmount
    }
  }, [canFlip]);

  return (
    <FlippingCardContainer>
      <FlippingCardInner isflipped={isFlipped}>
        <FlippingCardFace>
          <Box>
            <Box sx={{ paddingY: "20px" }}>
              <Box
                component="img"
                src={front}
                alt="Front Side"
                sx={{
                  width: {
                    xs: xs || "250px", // Responsive width for extra small screens, fallback to 250px
                    md: md,            // Width for medium screens
                    lg: lg || md,      // Width for large screens, fallback to md width
                    xl: xl,            // Width for extra large screens
                  },
                }}
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
              sx={{
                width: {
                  xs: xs || "250px", // Responsive width for extra small screens, fallback to 250px
                  md: md,            // Width for medium screens
                  lg: lg || md,      // Width for large screens, fallback to md width
                  xl: xl,            // Width for extra large screens
                },
              }}
            />
          </Box>
        </FlippingCardFace>
      </FlippingCardInner>
    </FlippingCardContainer>
  );
};

export default FloatObj;
