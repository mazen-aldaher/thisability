import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import ProductArchiveList from './components/ProductArchiveList';

const StoreArchive = () => {
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
          <BreadcrumbsComponent />
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
