import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import img2 from '../../../assets/ill/img2.png';
import img3 from '../../../assets/ill/img3.png';
import mock5 from '../../../assets/ill/mock-5.png';

const MissionVision = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: '#a6b8f0', paddingY: '15vh' }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Box
                component="img"
                alt="PlaceHolder"
                sx={{
                  width: isSmallScreen ? '100%' : '80%',
                  height: '100%',
                  borderRadius: '20px',
                }}
                src={img2}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Box>
              <Typography
                variant="h2"
                gutterBottom
                sx={{ color: '#fff', fontWeight: 600 }}
              >
                Mission & Vision
              </Typography>
              <Typography variant="h5" sx={{ fontSize: '21px', color: '#fff' }}>
                At Thisability, we’re all driven by one vision: to empower
                individual with disabilities to discover their passion, unleash
                their creative potential, and achieve financial independence
                through artistry.{' '}
              </Typography>
              <Box sx={{ paddingRight: isSmallScreen ? '0' : '0%', py: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: '21px', color: '#fff' }}
                >
                  We are committed to elevating their unique talents, ensuring
                  their masterpieces receive the visibility they deserve,
                  bringing their stories and talents to life. It’s about
                  connecting, supporting, and witnessing their remarkable
                  abilities of creating artwork.
                </Typography>
              </Box>
            </Box>
            <Box
              component="img"
              alt="PlaceHolder"
              src={img3}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionVision;
