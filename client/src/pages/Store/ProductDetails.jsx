import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ProductInfoTab from './components/ProductInfoTab';

import StarIcon from '@mui/icons-material/Star';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';

const PeoductDetails = () => {
  const [product, setProduct] = useState({
    id: 1,
    productImg:
      'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    thumbnails: [
      {
        thumb:
          'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      },
      {
        thumb:
          'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      },
      {
        thumb:
          'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      },
    ],
    name: 'Product1',
    averageRating: '3',
    price: '150',
    description:
      'cdscsdcsdcsdcsdcsdcsdcsdcsdcsdcsdcdccsdcsdcsdcsdcdcsdcsdcsdcsccsdcdscsdcsdccdscsdcsdcsdcsdcsdcds',
  });

  return (
    <Container maxWidth="xl">
      <Box>{/* there is a breadcrumbs */}</Box>
      <Grid container spacing={4}>
        <Grid item xl={6} xs={12}>
          <Box
            component={'img'}
            src={product.productImg}
            sx={{
              transform: 'scale(0.8)',
              backgroundColor: '#ededed',
              height: '600px',
              width: '100%',
              borderRadius: '25px',
              backgroundSize: 'contain',
              backgroundPosition: 'top ',
              backgroundRepeat: 'no-repeat',
              mb: '-10%',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              transform: 'scale(0.8)',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              top: 5,
            }}
          >
            {product.thumbnails &&
              product.thumbnails.map((thumb, index) => (
                <Box
                  key={index}
                  component={'img'}
                  src={thumb}
                  sx={{
                    backgroundColor: '#ededed',
                    height: '220px',
                    width: '230px',
                    borderRadius: '25px',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
          </Box>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Container maxWidth="sm" sx={{ pt: 10 }}>
            <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
              {product.name}
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', paddingY: '20px' }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    color={
                      index < product.averageRating ? 'primary' : 'disabled'
                    }
                  />
                ))}
              </Box>
              <Typography sx={{ marginLeft: 2 }} component={Link} to="#reviews">
                Read reviews
              </Typography>
            </Box>
            <Typography variant="h4">${product.price.fixed(2)}</Typography>
            <Box sx={{width:"20%"}}>
            <Typography variant="h5" sx={{ paddingY: '20px' }}>
              {product.description}
            </Typography>
            </Box>
            <Paper
              elevation={2}
              sx={{
                backgroundColor: '#00FF00',
                padding: '20px 40px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                src={product.artist ? product.artist.avatarUrl : ''}
                sx={{ width: '50px', height: '50px' }}
              />
              <Box>
                <Typography variant="h5">Artist:</Typography>

                <Box>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {product.artist
                      ? product.artist.username
                      : 'Unknown Artist'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            <Button
              variant="contained"
              sx={{ width: '100%', height: '70px', marginTop: '50px' }}
            >
              <Typography sx={{ fontSize: '20px' }}>Add to cart</Typography>
            </Button>
            <Box sx={{ paddingY: '20px' }}>
              <Typography variant="h6">Checkout safety</Typography>
              <Divider />
              <Box sx={{ paddingTop: '20px', display: 'flex', gap: 2 }}>
                {/* Example Payment Avatars */}
                <Avatar sx={{ width: '75px', height: '75px' }} />
                <Avatar sx={{ width: '75px', height: '75px' }} />
                <Avatar sx={{ width: '75px', height: '75px' }} />
                <Avatar sx={{ width: '75px', height: '75px' }} />
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Container maxWidth="xl" sx={{ paddingY: '50px' }}>
        <ProductInfoTab />
      </Container>
      <Container maxWidth="md" sx={{ textAlign: 'center', paddingY: '20px' }}>
        <Typography variant="h5">You may also like</Typography>
        {/* Slider for related products */}
      </Container>
      <Container maxWidth="lg" sx={{ textAlign: 'center', paddingY: '20px' }}>
        <Divider />
        <Typography variant="h5">Get Inspired by Our Community</Typography>
        {/* Slider for community posts */}
      </Container>
      <Container sx={{ paddingY: '50px' }}>
        <Typography variant="h6">Policy</Typography>
        <Typography>
          [Shipping, Returns and Refunds, Privacy Policy, Cookie Policy]
        </Typography>
        <Typography variant="h6">Contact</Typography>
        <Typography>[Email us, Call us, Chat Online]</Typography>
      </Container>
    </Container>
  );
};

export default PeoductDetails;
