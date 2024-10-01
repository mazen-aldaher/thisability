import React from "react";
import { Box, Container, Typography } from "@mui/material";
import img4 from "../../../assets/ill/img4.png";
import Placeholder from "../../../assets/placeholder.png";

const QuoteSection = ({products}) => (
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
    <Box sx={{ display: "flex", justifyContent:"space-evenly", backgroundColor:"#fff", height:'60vh' }}>
      <Box sx={{ marginTop: "-10%" }}>
        <Box component="img" alt="PlaceHolder" src={img4} sx={{borderRadius:"20px"}} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 5,
          alignItems: "center",
          pt:0
        }}
      >
        {products.map((product, index) => (
          <Box key={index}>
            <Box
              component="img"
              alt="PlaceHolder"
              src={product.imageUrl}
              sx={{ width: "100%" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  </>
);

export default QuoteSection;
