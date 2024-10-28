/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { Link,  useNavigate } from 'react-router-dom';
import ProductInfoTab from './components/ProductInfoTab';
import { Flag } from '@mui/icons-material'; // Optional: If you want to use icons for country
import StarIcon from '@mui/icons-material/Star';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import splitTextByWords from '../../utils/splitTextByWords';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [basketAdded, setBasketAdded] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate(); // Hook for navigation
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
    artist: {
      id: 1,
      username: 'Mazenaldaher',
      country: 'Egy',
      avatarUrl:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco mazen aldaher.',
  });
  const handleAddToCart = () => {
    setLoading(true);

    // Simulate a delay for adding to cart
    setTimeout(() => {
      setLoading(false);

      // Display the toast notification
      toast.success('Product added to cart!', {
        position: 'bottom-left',
        autoClose: 500,
      });

      // Simulate navigating to cart page after 2 seconds
      setTimeout(() => {
        navigate('/cart');
      }, 2000);
    }, 1000); // Simulate API loading time
  };
  const descriptionChunks = splitTextByWords(product.description, 30);

  return (
    <Container maxWidth="xl">
    <Box sx={{pt:5}} > 

      <BreadcrumbsComponent items={BreadItems} />
    </Box>
      <Grid container spacing={4}>
        <Grid item xl={6} xs={12}>
          <Box
            component={'img'}
            src={product.productImg}
            sx={{
              transform: { xl: 'scale(0.8)' },
              backgroundColor: '#ededed',
              height: { xl: '600px' },
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
              transform: { xl: 'scale(0.8)' },
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              top: 5,
              gap: { xs: 2 },
            }}
          >
            {product.thumbnails &&
              product.thumbnails.map((thumbObj, index) => (
                <Box
                  key={index}
                  component={'img'}
                  src={thumbObj.thumb}
                  sx={{
                    backgroundColor: '#ededed',
                    height: { xl: '220px' },
                    width: { xl: '230px', xs: '100%' },
                    borderRadius: '25px',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
          </Box>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Container maxWidth="sm" sx={{ pt: { xl: 10 } }}>
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
            <Typography variant="h3">${product.price}</Typography>
            <Box>
              {descriptionChunks.map((chunk, index) => (
                <Typography key={index} variant="h5" sx={{ paddingY: '20px' }}>
                  {chunk}
                </Typography>
              ))}
            </Box>

            <Box sx={{ pt: 1, pb: 3 }}>
              <Typography variant="h5"> - More about artist: </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.2,
                px: 2,
              }}
            >
              <Button
                sx={{
                  backgroundColor: '#00457C',
                  borderEndEndRadius: 0,
                  borderStartEndRadius: 0,
                  borderEndStartRadius: 40,
                  borderStartStartRadius: 40,
                  width: { xl: '50%', xs: '100%' },
                  height: '70px',
                  border: 'solid 1px #fff',
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar
                    src={product.artist ? product.artist.avatarUrl : ''}
                    sx={{ width: '50px', height: '50px' }}
                  />
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {product.artist.username}
                  </Typography>
                </Box>
              </Button>
              <Button
                sx={{
                  backgroundColor: '#3B7BBF',
                  borderRadius: 0,
                  width: '35%',
                  height: '70px',
                  Border: 'solid 1px #fff',
                }}
              >
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  Autism
                </Typography>
              </Button>
              <Button
                sx={{
                  backgroundColor: '#00457C',
                  borderEndStartRadius: 0,
                  borderStartStartRadius: 0,
                  borderEndEndRadius: 40,
                  borderStartEndRadius: 40,
                  width: '35%',
                  height: '70px',
                  border: 'solid 1px #fff',
                }}
              >
                <Box>
                  {product.artist.country && (
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      {product.artist.country}
                    </Typography>
                  )}
                </Box>
              </Button>
            </Box>
            <Container maxWidth="sm">
              {/* Button or Loading */}
              {!loading && (
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '70px',
                    marginTop: '50px',
                    borderRadius: '40px',
                  }}
                  onClick={handleAddToCart}
                >
                  <Typography sx={{ fontSize: '20px' }}>Add to cart</Typography>
                </Button>
              )}

              {/* Loading Animation */}
              {loading && (
                <Typography sx={{ textAlign: 'center', marginTop: '50px' }}>
                  Loading...
                </Typography>
              )}
            </Container>
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
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </Container>
  );
};

export default ProductDetails;
