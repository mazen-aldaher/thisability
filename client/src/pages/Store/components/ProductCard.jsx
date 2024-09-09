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

const ProductCard = () => {
  const productPrice = 9600;  // Product price

  return (
    <Box sx={{ transform: 'scale(0.9)', transformOrigin: "top center" }}>
      <Card sx={{ maxWidth: 364, borderRadius: '16px', boxShadow: 3 }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          alt="New School Teachers"
          height="250"

          image="https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg"
          sx={{ borderRadius: '16px 16px 0 0',objectFit:"cover" }}
        />

        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Category Label */}
            <Chip label="Education" color="warning" sx={{ fontWeight: 'bold' }} />

            {/* Rating */}
            <Box display="flex" alignItems="center">
              <StarIcon sx={{ color: '#FFC107' }} />
              <Typography variant="body2" sx={{ marginLeft: 0.5, fontWeight: 'bold' }}>
                4.5
              </Typography>
            </Box>
          </Grid>

          {/* Title and Description */}
          <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 2,textAlign:"left" }}>
            New School Teachers
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign={"left"}>
            Welcoming new school teachers to inspire and educate, shaping a brighter future for students.
          </Typography>

          {/* Product Price */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Price:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
              ${productPrice}
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        {/* Footer with Social Icons and Buy Now Button */}
        <CardActions sx={{ padding: '16px' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box display="flex" alignItems="center">
                <IconButton aria-label="facebook" color="primary">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="whatsapp" color="success">
                  <WhatsAppIcon />
                </IconButton>
                <IconButton aria-label="instagram" color="secondary">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item>
              <Button variant="contained" color="success" sx={{ borderRadius: 5 }}>
                Buy Now &raquo;
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
