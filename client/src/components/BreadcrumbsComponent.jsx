import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbsComponent = ({items =[]}) => {
  
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: 2 }}>
      {items.map((item, index) => (
        item.path ? (
          <Link
            key={index}
            component={RouterLink}
            to={item.path}
            sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
            underline="hover"
          >
            {item.icon}
            {item.text}
          </Link>
        ) : (
          <Typography
            key={index}
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            {item.icon}
            {item.text}
          </Typography>
        )
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
