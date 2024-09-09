
import React, { useState } from "react";
import { Typography, Box, Chip } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import eyes from "../assets/ill/mock-eyes.png";
import { NavLink } from "react-router-dom";

// Keyframes for combined floating animation
const float = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -10px);
  }
`;

const FlippingCardContainer = styled(Box)({
  perspective: "1000px",
  width: "300px",
  height: "400px",
  animation: `${float} 4s ease-in-out infinite`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "25px",
});

const FlippingCardInner = styled(Box)(({ isflipped, backgroundColor }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  willChange: "transform",
  transformStyle: "preserve-3d",
  transform: isflipped ? "rotateY(180deg)" : "rotateY(0deg)",
  backgroundColor,
  borderRadius: "25px",
}));

const FlippingCardFace = styled(Box)(({ back, backgroundColor }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  display: "flex",
  justifyContent: "center",
  backgroundColor,
  ...(back && {
    transform: "rotateY(180deg)",
    backgroundColor,
    borderRadius: "25px",
  }),
}));

const FlippingCard = ({
  FrontTitle = "Untitled",
  BackTitle = "No description available",
  ArtistName = "Unknown Artist",
  Category = "Uncategorized",
  ArtistImg = "",
  ArtImg = "",
  backgroundColor = "orange", // Default color if none is passed
  link
}) => {
  const [isflipped, setisflipped] = useState(false);

  const handleFlip = () => {
    setisflipped(!isflipped);
  };
  const handleNoneFlip = () => {
    setisflipped(false);
  };

  return (
    
    <NavLink to={link} >
    <FlippingCardContainer
      onMouseEnter={handleFlip}
      onMouseLeave={handleNoneFlip}
    >
      <FlippingCardInner isflipped={isflipped}>
        {/* Front Face */}
        <FlippingCardFace backgroundColor={backgroundColor}>
          <Box sx={{ paddingY: 3 }}>
            <Box sx={{ textAlign: "left", pl: 2 }}>
              <Chip
                label={Category}
                sx={{
                  backgroundColor: "#fff",
                  width: "100px",
                  color: "darkOrange",
                }}
              />
            </Box>
            <Box sx={{ alignItems: "center",  }}>
              <Box component={"img"} src={ArtImg} alt={FrontTitle} />
            </Box>
            <Box sx={{ paddingY: "20px", px: 8 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {FrontTitle}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: "-40%",
                pr: 2,
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              <Box
                component={"img"}
                src={eyes}
                alt="Decorative Eyes"
                sx={{ width: "20%", transform: "rotate(-25deg)" }}
              />
            </Box>
          </Box>
        </FlippingCardFace>

        {/* Back Face */}
        <FlippingCardFace back backgroundColor={backgroundColor}>
          <Box sx={{ pt: 5 }}>
            <Box>
              <Box component={"img"} src={ArtistImg} alt={ArtistName} />
            </Box>
            <Box>
              <Typography variant="h6" component="div">
                {BackTitle}
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: "#fff" }}>
                "{ArtistName}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore the Artist's World
              </Typography>
            </Box>
          </Box>
        </FlippingCardFace>
      </FlippingCardInner>
    </FlippingCardContainer>
    </NavLink>
  );
};

export default FlippingCard;
