import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import img1 from '../../../assets/ill/img1.png';
import mock3 from '../../../assets/ill/mock-3.png';
import mock4 from '../../../assets/ill/mock-4.png';

const ArtBridge = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: '#f36c00',
        height: isSmallScreen
          ? '80vh'
          : '100vh', 
        pt: isSmallScreen ? 20 : '',
      }}
    >
      <Box
        sx={{
          display: isSmallScreen ? 'none' : 'flex',
          position: 'relative',
          justifyContent: 'flex-end',
          width: '100%',
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          alt="PlaceHolder"
          sx={{
            borderRadius: '20px',
            width: isMediumScreen
              ? '250px'
              : { xl: 'auto', lg: '500px', md: '400px' },
          }}
          src={mock3}
        />
      </Box>
      <Container maxWidth="xl" sx={{ paddingY: '50px', mt: '-35%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography
              gutterBottom
              sx={{
                color: '#fff',
                textAlign: isSmallScreen ? 'left' : 'center',
                fontSize: '60px',
              }}
            >
              Art as a Bridge
            </Typography>
          </Box>

          <Box sx={{ paddingTop: { xl: '20px' }, pb: 3 }}>
            {isSmallScreen ? (
              <Typography
                sx={{ color: '#fff', textAlign: 'left', fontSize: '20px' }}
              >
                Art serves as a means of healing, understanding, and unity.
                Unique artists, facing their own challenges, use creativity to
                communicate and inspire. Their artwork narrates stories of
                life's struggles and triumphs, embodying courage, hope, and
                resilience. By sharing their creations, they celebrate personal
                achievements and connect with people globally.
              </Typography>
            ) : (
              <Typography
                sx={{ color: '#fff', textAlign: 'center', fontSize: '28px' }}
              >
                Art is more than just a form of expression—it’s a pathway to
                healing, understanding, and unity. Our special artists, each
                with their own set of challenges, use their creativity as a
                powerful tool to communicate, heal, and inspire. Their artwork
                tells a story of life’s challenges and joys, filled with
                courage, hope, and resilience. By sharing their creations, they
                not only celebrate their personal achievements but also connect
                with hearts and minds around the world.
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: isSmallScreen ? 'none' : 'flex',
              justifyContent: isSmallScreen ? 'center' : 'flex-start',
            }}
          >
            <Box
              component="img"
              alt="PlaceHolder"
              sx={{
                borderRadius: '20px',
                width: isMediumScreen
                  ? '250px'
                  : { xl: 'auto', lg: '500px', md: '400px' },
              }}
              src={mock4}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: isSmallScreen ? '0%' : {xl:'-15%',lg:"-15%",md:"-20%",sm:"-60%"},
          }}
        >
          <Box>
            <Box
              component="img"
              alt="PlaceHolder"
              sx={{
                height: isSmallScreen ? 'auto' : '100%',
                width: isSmallScreen ? '100%' : {xl:'650px',lg:"650px",md:"100%",sm:"100%"},
                borderRadius: '20px',
              }}
              src={img1}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ArtBridge;
