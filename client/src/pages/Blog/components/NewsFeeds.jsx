import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import PostCardSlider from './PostCardSlider';

const NewsFeeds = () => {
  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{ py: 5, width: { md: '1200px', sm: '800px', xs: '450px' } }}
      >
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
