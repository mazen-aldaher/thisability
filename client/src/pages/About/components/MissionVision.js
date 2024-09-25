import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import img2 from "../../../assets/ill/img2.png";
import img3 from "../../../assets/ill/img3.png";

const MissionVision = () => (
  <Box sx={{ backgroundColor: "#a6b8f0", paddingY: "15vh" }}>
    <Container>
      <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={12} sm={6} md={4} lg={6}>
          <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h4" gutterBottom>
              Illustration
            </Typography>
            <Box
              component="img"
              alt="PlaceHolder"
              sx={{ height: "100%", width: "350px" }}
              src={img2}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={6}>
          <Box>
            <Typography variant="h2" gutterBottom sx={{ color: "#fff" }}>
              Mission & Vision
            </Typography>
            <Typography variant="h5" sx={{ fontSize: "21px", color: "#fff" }}>
              At Thisability, we’re all driven by one vision...
            </Typography>
          </Box>
          <Box
            component="img"
            alt="PlaceHolder"
            sx={{ height: "400px", width: "600px" }}
            src={img3}
          />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default MissionVision;
