import React from "react";
import { Box, Container, Typography } from "@mui/material";

const OurStory = () => (
  <Container maxWidth="lg" sx={{ paddingBottom: "10vh" }}>
    <Box sx={{ paddingTop: "10px" }}>
      <Typography variant="h2" gutterBottom sx={{ color: "#f36c00" }}>
        Our Story
      </Typography>
    </Box>
    <Box sx={{ paddingRight: "45%" }}>
      <Typography variant="h5" sx={{ fontSize: "21px" }}>
        Born from the belief that each individual has a unique gift to share
        with the world...
      </Typography>
    </Box>
  </Container>
);

export default OurStory;
