import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import mock5 from '../../assets/ill/mock-5.png';
import mock6 from '../../assets/ill/mock-6.png';
import brile from '../../assets/ill/prile.png';
import art from '../../assets/ill/art-ist/WHISPORTH_OF_THE_WIND.png';
import FloatObj from '../../components/FloatObj';
import mock7 from '../../assets/ill/mock-7.png';
import artistart from '../../assets/ill/art-ist/ARTIST_ART.png';
import ProductSliderComponent from '../Landing/components/ProductSliderComponent';
import ProductCard from '../Store/components/ProductCard';
import BiddingProductCard from '../Store/components/BiddingProductCard';
import BiddingArchive from '../Store/BiddingArchive';
import StoreArchive from '../Store/StoreArchive';

const ArtistPage = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'flex-start',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#F36C00',
              clipPath: `path("M13.37,320.98s59.44,111.48,423.52,119.28c364.08,7.8,649.4-60.73,826.24,214.71,176.84,275.44,404.2,201.7,442.84,175.67,38.64-26.02,285.32,28.19,285.32,28.19l8.92-841.49L0,0,13.37,320.98Z")`,
              zIndex: -1,
              transform: 'rotate(-0.5deg)',
            },
          }}
        >
          {' '}
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              position: { xl: 'absolute', md: 'absolute', xs: 'absolute' },
            }}
          >
            <Box
              component={'img'}
              src={mock5}
              sx={{
                width: { xl: '200px', md: '100%', xs: '200px' },
                height: { xl: '200px', md: '150px', xs: '150px' },
              }}
            />
          </Box>
          <Box>
            <Box sx={{ px: { xl: 10, md: 5, xs: 4 } }}>
              <Box
                sx={{
                  pt: { xl: 30, md: 25, xs: 25 },
                  display: 'flex',
                  flexWrap: { md: 'nowrap', xs: 'wrap' },
                }}
              >
                {/* First Section */}
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}
                  >
                    {/*** Img Profile Component - Should Make it Reusable ***/}
                    <Box
                      sx={{
                        width: { xl: '50vh', md: '45vh', xs: '100%' },
                      }}
                    >
                      <Box
                        component={'img'}
                        src="https://t3.ftcdn.net/jpg/01/79/46/68/360_F_179466839_nARiMdo6ocQWnw6X5YyecerwSYnAVb88.jpg"
                        sx={{
                          backgroundColor: '#fff',
                          width: '100%',
                          height: { xl: '60vh', md: '65vh', xs: '100%' },
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '25px',
                          border: `solid 1px {theme.palette.primary.main}`,
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    {/*** Artitst Info Box - Should Make it Reusable ***/}

                    <Box
                      sx={{
                        maxWidth: { xl: 550, xs: 450 },
                        paddingLeft: { xs: '0', md: 5 },
                        paddingTop: { xs: 2, md: 28 },
                      }}
                    >
                      <Box sx={{ pt: 2 }}>
                        <Typography
                          color={theme.palette.secondary.main}
                          variant="h3"
                          fontWeight={600}
                        >
                          Hanan Mohamed
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          paddingY: '20px',
                          maxWidth: { xl: '80vw', md: '100%' },
                        }}
                      >
                        <Typography
                          color={theme.palette.secondary.main}
                          variant="h5"
                        >
                          The tactile dimensions of colorful paper cuts designed
                          to be experienced through touch. The artwork depicts
                          the power of imagination in the eye’s mind to perceive
                          beauty.
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <Button
                          sx={{
                            width: '290px',
                            height: '50px',
                            backgroundColor: '#F36C00',
                            fontSize: '20px',
                            borderRadius: '20px',
                          }}
                          variant="contained"
                        >
                          <Typography variant="navText">Shop Now</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: { xl: 'flex', xs: 'none' },
                    position: {
                      xl: 'absolute',
                      md: 'absolute',
                      xs: 'relative',
                    },
                    right: { xl: '10%', md: '10%', xs: '-5%' },
                    top: { xl: '25%', md: '15%', xs: 0 },
                    textAlign: 'right',
                    justifyContent: 'flex-end',
                    p: 2, // Optional padding to keep some space from the edge
                  }}
                >
                  <Box
                    component={'img'}
                    src={mock6}
                    sx={{
                      width: { xl: '250px', md: '200px', xs: '200px' },
                      height: { xl: '300px', xs: '300px' },
                    }}
                    loading="lazy"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Second Section */}

      <Box sx={{ my: '5%' }}>
        <Box
          sx={{
            display: 'flex',
            px: { xl: 10, md: 5, xs: 5 },
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ pt: { xl: 10, xs: 5 }, width: { xs: '100%', md: '75%' } }}>
            <Box sx={{ paddingY: { xl: '20px' }, paddingRight: '0%' }}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '2.5rem' } }}
                color={theme.palette.secondary.main}
              >
                LEARN MORE ABOUT THE ARTIST
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: { xl: '30px', md: '25px', xs: '1.1rem' } }}
            >
              Discover Hend Khalil, a visionary artist who transitioned from
              traditional painting to creating tactile artworks using materials
              like foam, wires, seeds, cotton, and paper cuts. Guided by touch,
              she crafts stunning collage paintings that express the true art
              beyond vision.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              paddingLeft: { xs: '0', md: '5%' },
              marginTop: { xs: '20px', md: '0' },
            }}
          >
            <Box sx={{ pb: 5 }}>
              <Box component={'img'} src={brile} />{' '}
            </Box>
            <Box
              component="iframe"
              width="100%"
              src="https://www.youtube.com/embed/DmOjmasF20I"
              allow="autoplay; encrypted-media"
              allowFullScreen
              sx={{
                borderRadius: '20px',
                border: 'solid 2px',
                height: { xl: '500px', md: '450px', xs: '250px' },
              }}
            />
          </Box>
        </Box>
        {/* Third Section */}
        <Box sx={{ paddingY: '5%', height: { xl: '90vh' } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              backgroundColor: '#F36C00',
              height: '100%',
              px: { xl: 30, xs: 5 },
              py: 10,
              alignContent: 'flex-start',
              alignItems: { xl: 'flex-start', xs: 'center' },
            }}
          >
            <Box>
              <Box
                component={'img'}
                src={art}
                sx={{ width: { xl: '300px', xs: '100%' } }}
              />
            </Box>

            <Box
              sx={{
                justifyContent: 'flex-start',
                paddingLeft: { xs: '0', md: '10%' },
                marginTop: { xs: '20px', md: '0' },
              }}
            >
              <Box sx={{ paddingRight: { xs: '0', md: '30%' } }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2.5rem' } }}
                  color={'#fff'}
                >
                  WHISPERS OF THE WIND
                </Typography>{' '}
              </Box>
              <Box sx={{ paddingRight: { xs: '0', md: 20 }, pt: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: { xs: '1.1rem' } }}
                  color={'#fff'}
                >
                  Each element weaves a story of resilience and grace,
                  portraying her joyful dance as a celebration of overcoming
                  life’s challenges. The artwork is a touching reminder of the
                  beauty and strength found in embracing our journeys with open
                  hearts.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <FloatObj front={mock7} canFlip={false} xl="350px" />
            </Box>
          </Box>
        </Box>
        {/* Forth Section */}

        <Box sx={{ my: '5%' }}>
          <Box
            sx={{
              display: 'flex',
              px: { xl: 10, md: 5, xs: 5 },
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{ pt: { xl: 10, xs: 5 }, width: { xs: '100%', md: '75%' } }}
            >
              <Box sx={{ paddingY: { xl: '20px' }, paddingRight: '0%' }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2.5rem' } }}
                  color={theme.palette.secondary.main}
                >
                  Artist Ateleih{' '}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: { xl: '30px', md: '25px', xs: '1.1rem' } }}
              >
                Discover Hend Khalil, a visionary artist who transitioned from
                traditional painting to creating tactile artworks using
                materials like foam, wires, seeds, cotton, and paper cuts.
                Guided by touch, she crafts stunning collage paintings that
                express the true art beyond vision.
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                paddingLeft: { xs: '0', md: '5%' },
                marginTop: { xs: '20px', md: '0' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  transform: 'scale(0.8)',
                  transformOrigin: 'top center',
                }}
              >
                <BiddingProductCard />
                <BiddingProductCard />
                <BiddingProductCard />
                <BiddingProductCard />
              </Box>{' '}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box textAlign={'center'} sx={{ py: 5 }}>
            <Box
              sx={{ pt: { xl: 10, xs: 5 }, width: { xs: '100%', md: '100%' } }}
            >
              <Box sx={{ paddingY: { xl: '20px' }, paddingRight: '0%' }}>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2.5rem' } }}
                  color={theme.palette.secondary.main}
                >
                  Artist Ateleih{' '}
                </Typography>
              </Box>
              <Box sx={{ px: 50 }}>
                <Typography variant="h5">
                  Discover Hend Khalil, a visionary artist who transitioned from
                  traditional painting to creating tactile artworks using
                  materials like foam, wires, seeds, cotton, and paper cuts.
                  Guided by touch, she crafts stunning collage paintings that
                  express the true art beyond vision.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              transform: 'scale(0.8)',
              transformOrigin: 'top center',
            }}
          >
            <StoreArchive />{' '}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ArtistPage;
