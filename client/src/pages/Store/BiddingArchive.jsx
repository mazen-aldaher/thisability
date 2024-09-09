import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent'; // Ensure this path is correct
import BiddingArchiveList from './components/BiddingArchiveList';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BiddingArchive = () => {
  const BreadItems = [
    { text: 'Home', path: '/', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { text: 'Products Listing', path: '/products', icon: <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" /> },
    { text: 'Current Page', icon: null }  // No path means it's the current page
  ];

  return (
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
          Bidding Products
        </Typography>
        <Typography variant="body1" textAlign={'center'}>
          Place your bids on exclusive artwork and handmade items.
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
        <BiddingArchiveList />
      </Box>
    </Container>
  );
};

export default BiddingArchive;
