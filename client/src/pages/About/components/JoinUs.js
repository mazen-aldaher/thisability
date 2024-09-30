import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import mock9 from '../../../assets/ill/mock-9.png';
import mock8 from '../../../assets/ill/mock-8.png';

const JoinUs = () => (
  <Box sx={{ paddingY: '10vh' }}>
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative', // Position relative for absolute positioning inside
          zIndex: 1,
        }}
      >
        {/* Box containing the images */}
        <Box sx={{ display: 'flex', zIndex: 2, position: 'relative',ml:"-5%",mr:"-35%" }}>
          <Box component={'img'} src={mock9} />
        </Box>
        <Box sx={{ display: 'flex', zIndex: 1, position: 'relative' }}>
          <Box component={'img'} src={mock8} />
        </Box>

        {/* Overlay text */}
        <Box
          sx={{
            position: 'absolute', // Text is positioned absolutely
            top: '50%', // Adjust the top position as needed
            left: '45%', // Center the text horizontally
            right: '-40%',
            transform: 'translate(-50%, -50%)', // Ensure proper centering
            textAlign: 'center', // Center the text
            color: '#fff', // Text color
            zIndex: 3, // Ensure the text is on top of the images
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            textAlign={'center'}
            sx={{ color: '#fff', fontWeight: 600 }}
          >
            Join Us in our journey to empower and celebrate the achievements of
            individuals with special abilities and support the aspirations and
            talents of our exceptional community members.
          </Typography>
          <Typography
            variant="h4"
            textAlign={'center'}
            sx={{ color: '#fff', fontWeight: 600 }}
          >
            Experience the joy of finding the perfect piece of art or craft that
            tells a story of resilience and creativity.
          </Typography>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default JoinUs;
