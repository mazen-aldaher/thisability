/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import FloatObj from "../../../components/FloatObj";

import ItemsSlider from "../../../components/ItemsSlider";
import CTABTN from "../../../components/Button/CTABTN";
import PostCardSlider from "../../Blog/components/PostCardSlider";
import SectionTitle from "../../../components/SectionTitle";

const CtaSection = () => {
  const theme = useTheme();

  return (
    <Box>
    <SectionTitle/>
        <Container>
          <Box>
            <Typography
              variant="h5"
              textAlign="center"
              color={theme.palette.secondary.main}
              sx={{ my: 3 }}
            >
              Flip the Card to explore more!
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 5,display:{md:"flex",xs:"none"} }}>
            <ItemsSlider />

          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.secondary.main,
              }}
            >
              Each piece of our collection tells a story. <br /> These artworks
              are expressions of strength, diversity, and the unstoppable
              spirit.
            </Typography>
          </Box>
        </Container>
      </Box>
  );
};

export default CtaSection;
