import React from 'react';
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import mock5 from '../../../assets/ill/mock-5.png';

const OurStory = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          paddingBottom: '10vh',
          pt: isSmallScreen ? '35vh' : '',
          height: '100%',
        }}
      >
        <Box sx={{ paddingTop: '10px' }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: '#f36c00', fontWeight: 600 }}
          >
            Our Story
          </Typography>
        </Box>
        <Box sx={{ paddingRight: isSmallScreen ? '0' : '45%' }}>
          <Typography variant="h5" sx={{ fontSize: '21px' }}>
            Born from the belief that each individual has an unique gift to
            share with the world, Thisability celebrates the diverse talents
            often hidden behind life’s challenges. Recognizing the difficulties
            faced in expressing creativity and finding one’s voice, we’ve
            created a place where every creation resonates with someone’s soul.
          </Typography>
        </Box>
        <Box sx={{ paddingRight: isSmallScreen ? '0' : '45%', py: 4 }}>
          <Typography variant="h5" sx={{ fontSize: '21px' }}>
            Each product has a story behind it, a story of passion,
            perseverance, and pride. Each piece mirrors the artist’s essence,
            filled with a vibrant spirit that aims to inspire and move hearts.
          </Typography>
        </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
          transform: isSmallScreen ? "rotate(25deg)":"none",
          zIndex: 2,
          mb: '-15%',
        }}
      >
        <Box
          component="img"
          alt="PlaceHolder"
          sx={{ borderRadius: '20px' }}
          src={mock5}
        />
      </Box>
      </Container>
    </>
  );
};

export default OurStory;
