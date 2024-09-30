import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import curve from '../../../assets/curve.png';
import sample from '../../../assets/sample.png';
import dots from '../../../assets/dots.png';

const FunFacts = () => (
  <Box sx={{ paddingY: '0' }}>
    <Box
      display={'flex'}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Box>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ color: '#f36c00' }}>
            Did you know that engaging in creative activities such as making
            art, crafts, or music can reduce stress, increase self-esteem, and
            enhance social connections for people with special abilities?{' '}
          </Typography>
        </Container>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component={'img'} src={curve} alt="curve" />
        <Box sx={{ paddingTop: '20vh' }}>
          <Typography variant="h3" sx={{ color: '#f36c00' }} gutterBottom fontWeight={800} >
            Fun Facts
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: '-15%' }}>
        <Box
          component={'img'}
          src={sample}
          sx={{ width: '400px', height: '650px' }}
          alt="sample"
        />
      </Box>
    </Box>
    <Box sx={{ paddingLeft: '10%', paddingY: '8vh' }}>
      <Box component={'img'} src={dots} alt="dots" />
    </Box>
  </Box>
);

export default FunFacts;
