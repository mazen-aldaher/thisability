import React from "react";
import { Box, Container, Typography } from "@mui/material";
import img4 from "../../../assets/ill/img4.png";
import Placeholder from "../../../assets/placeholder.png";

const QuoteSection = () => (
  <>
    <Box sx={{ backgroundColor: "green", height: "60vh" }}>
      <Container sx={{ paddingY: "20vh" }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: "#fff", textAlign: "center" }}
        >
          "The most creative people are motivated by the grandest of
          problems..."
        </Typography>
        <Typography variant="h4" sx={{ color: "#fff", textAlign: "center" }}>
          - Neil deGrasse Tyson
        </Typography>
      </Container>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ marginTop: "-10%" }}>
        <Box component="img" alt="PlaceHolder" src={img4} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
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
