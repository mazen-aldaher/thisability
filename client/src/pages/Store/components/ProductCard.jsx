import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Grid,
  Chip,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink } from 'react-router-dom';

const ProductCard = ({
  category,
  productTitle,
  description,
  artImg,
  price,
  facebookUrl,
  whatsappUrl,
  instagramUrl,
  link
}) => {

  return (
    <Box sx={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
    <NavLink style={{textDecoration:"none"}} to={link}>

      <Card sx={{ maxWidth: 364, borderRadius: '16px', boxShadow: 3 }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          alt={productTitle}
          height="250"
          image={artImg}
          sx={{ borderRadius: '16px 16px 0 0', objectFit: 'cover' }}
        />

        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Category Label */}
            <Chip
              label={category}
              color="warning"
              sx={{ fontWeight: 'bold',minWidth:"10vh" }}
            />

            {/* Rating */}
            <Box display="flex" alignItems="center">
              <StarIcon sx={{ color: '#FFC107' }} />
              <Typography
                variant="body2"
                sx={{ marginLeft: 0.5, fontWeight: 'bold' }}
              >
                4.5
              </Typography>
            </Box>
          </Grid>

          {/* Title and Description */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginTop: 2, textAlign: 'left' }}
          >
            {productTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign={'left'}>
            {description}
          </Typography>

          {/* Product Price */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Price:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: '#2E7D32' }}
            >
              ${price}
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        {/* Footer with Social Icons and Buy Now Button */}
        <CardActions sx={{ padding: '16px' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box display="flex" alignItems="center">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="facebook" color="primary">
                    <FacebookIcon />
                  </IconButton>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="whatsapp" color="success">
                    <WhatsAppIcon />
                  </IconButton>
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="instagram" color="secondary">
                    <InstagramIcon />
                  </IconButton>
                </a>
              </Box>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: 5 }}
              >
                Buy Now &raquo;
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </NavLink>
    </Box>
  );
};

export default ProductCard;
