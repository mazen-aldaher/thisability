
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import ItemsSlider from "../../../components/ItemsSlider";

const CtaSection = () => {
  const theme = useTheme();

  return (
    <Box>
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

        <Box sx={{ my: 5 }}>
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
            are expressions of strength, diversity, and the unstoppable spirit.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CtaSection;