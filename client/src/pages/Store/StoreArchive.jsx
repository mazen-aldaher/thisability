import { Box, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import ProductArchiveList from './components/ProductArchiveList';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const StoreArchive = () => {
  const BreadItems = [
    {
      text: 'Home',
      path: '/',
      icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
    },
    {
      text: 'Products Listing',
      path: '/products',
      icon: <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
    },
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Box
          sx={{
            py: 5,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" textAlign={'center'}>
            Products Listing
          </Typography>

          <BreadcrumbsComponent items={BreadItems} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProductArchiveList />
        </Box>
      </Container>
    </>
  );
};

export default StoreArchive;
