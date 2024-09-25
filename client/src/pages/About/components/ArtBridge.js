import React from "react";
import { Box, Container, Typography } from "@mui/material";
import img1 from "../../../assets/ill/img1.png";

const ArtBridge = () => (
  <Box sx={{ backgroundColor: "#f36c00", height: "80vh", paddingTop: "5%" }}>
    <Container sx={{ paddingY: "50px" }}>
      <Box>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ color: "#fff", textAlign: "center" }}
        >
          Art as a Bridge
        </Typography>
      </Box>
      <Box sx={{ paddingTop: "20px" }}>
        <Typography
          variant="h5"
          sx={{ color: "#fff", textAlign: "center", fontSize: "28px" }}
        >
          Art is more than just a form of expression—it’s a pathway to healing,
          understanding, and unity...
        </Typography>
      </Box>
    </Container>
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box sx={{ paddingRight: "50px" }}>
        <Box
          component="img"
          alt="PlaceHolder"
          sx={{ height: "100%", width: "600px" }}
          src={img1}
        />
      </Box>
    </Box>
  </Box>
);

export default ArtBridge;
