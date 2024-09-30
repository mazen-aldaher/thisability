import React from "react";
import { Box, Container, Typography } from "@mui/material";
import img4 from "../../../assets/ill/img4.png";
import Placeholder from "../../../assets/placeholder.png";

const QuoteSection = () => (
  <>
    <Box sx={{ backgroundColor: "green", height: "70vh" }}>
      <Container sx={{ paddingY: "20vh" }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: "#fff", textAlign: "center" }}
        >
          "The most creative people are motivated by the grandest of
          problems that are presented before them."
        </Typography>
        <Typography variant="h4" sx={{ color: "#fff", textAlign: "center" }}>
          - Neil deGrasse Tyson
        </Typography>
      </Container>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-around", backgroundColor:"#fff", height:'60vh' }}>
      <Box sx={{ marginTop: "-10%" }}>
        <Box component="img" alt="PlaceHolder" src={img4} sx={{borderRadius:"20px"}} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          alignItems: "flex-start",
          pt:5
        }}
      >
        {[...Array(4)].map((_, index) => (
          <Box key={index}>
            <Box
              component="img"
              alt="PlaceHolder"
              src={Placeholder}
              sx={{ clipPath: "circle(44%)", width: "200px" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  </>
);

export default QuoteSection;
