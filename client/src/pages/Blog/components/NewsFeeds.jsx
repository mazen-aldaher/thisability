
import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";

import PostCard from "./PostCard";
import PostCardSlider from "./PostCardSlider";

const NewsFeeds = () => {
  const theme = useTheme();

  return (
    <Box>
      <Container sx={{ py: 2, display: { md: "flex", xs: "none" } }}>
        <Box sx={{ py: 5 }} textAlign="center">
          <Typography variant="h4">News Feeds</Typography>
          <Typography variant="h2">Letest News & Articles</Typography>
        </Box>
        {/* Post Card */}
        <Box>
          <PostCardSlider />
        </Box>
      </Container>
    </Box>
  );
};

export default NewsFeeds;
