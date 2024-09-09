import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BreadcrumbsComponent = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: 2 }}>
      {/* Home breadcrumb */}
      <Link
        component={RouterLink}
        to="/"
        sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
        underline="hover"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>

      {/* Products listing breadcrumb */}
      <Link
        component={RouterLink}
        to="/products"
        sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
        underline="hover"
      >
        <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Products Listing
      </Link>

      {/* Active page - current page 
      <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
        Current Page
      </Typography>*/}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
