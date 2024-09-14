import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import mock5 from '../../../assets/ill/mock-5.png';
import mock6 from '../../../assets/ill/mock-6.png';
import brile from '../../../assets/ill/prile.png';
import FloatObj from '../../../components/FloatObj';
import mock7 from '../../../assets/ill/mock-7.png';
import ProductsArtistList from './ProductArtistList';

const Artist = ({ data, artist }) => {
  const theme = useTheme();
  return (
    <>
      {artist.map((item) => (
        <>
          <Box key={item.id}>
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
              <>
                <Box
                  sx={{
                    pt: 2,
                    display: 'flex',
                    position: {
                      xl: 'absolute',
                      md: 'absolute',
                      xs: 'absolute',
                    },
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
                              src={item.artistImg}
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
                                {item.artistName}{' '}
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
                                {item.descriptionGeneral}{' '}
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
                                <Typography variant="navText">
                                  Shop Now
                                </Typography>
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
              </>
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
              <Box
                sx={{ pt: { xl: 10, xs: 5 }, width: { xs: '100%', md: '75%' } }}
              >
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
                  {item.descriptionMain}
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
                    src={item.artImg}
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
                      sx={{ fontSize: { xl: '4rem', xs: '2.5rem' } }}
                      color={'#fff'}
                    >
                      {item.artTitle}{' '}
                    </Typography>{' '}
                  </Box>
                  <Box sx={{ paddingRight: { xs: '0', md: 20 }, pt: 4 }}>
                    <Typography variant="h5" color={'#fff'}>
                  {item.artDescription}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <FloatObj front={mock7} canFlip={false} xl="350px" />
                </Box>
              </Box>
            </Box>
            {/* Forth Section */}

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
                  sx={{
                    pt: { xl: 5, xs: 5 },
                    width: { xs: '100%', md: '100%' },
                  }}
                >
                  <Box sx={{ paddingY: { xl: '20px' }, paddingRight: '0%' }}>
                    <Typography
                      sx={{ fontSize: { xl: '5rem', xs: '2.5rem' } }}
                      color={theme.palette.secondary.main}
                    >
                      Artist Ateleih{' '}
                    </Typography>
                  </Box>
                  <Box sx={{ px: { xl: 50, md: 30 } }}>
                    <Typography variant="h5">
                      Discover Hend Khalil, a visionary artist who transitioned
                      from traditional painting to creating tactile artworks
                      using materials like foam, wires, seeds, cotton, and paper
                      cuts. Guided by touch, she crafts stunning collage
                      paintings that express the true art beyond vision.
                    </Typography>
                  </Box>
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
              <ProductsArtistList products={data} />{' '}
            </Box>
          </Box>
        </>
      ))}
    </>
  );
};

export default Artist;
