import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const BiddingProductCard = () => {
  const currentBid = 9600;  // Current highest bid
  const goalBid = 12000;  // Maximum or expected bid
  const timeLeft = '2h 30m'; // Time left for the auction

  return (
    <Card sx={{ maxWidth: 400, borderRadius: '16px', boxShadow: 3 }}>
      {/* Product Image */}
      <CardMedia
        component="img"
        alt="New School Teachers"
        height="200"
        image="https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h19.jpg"
        sx={{ borderRadius: '16px 16px 0 0' }}
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
        <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 2 }}>
          New School Teachers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bidding on products related to education, supporting new school teachers. Make a bid and contribute!
        </Typography>

        {/* Current Bid and Time Left */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Current Bid
            </Typography>
            <Typography variant="h6" sx={{ marginLeft: 1, fontWeight: 'bold', color: '#2E7D32' }}>
              ${currentBid}
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Goal: ${goalBid}
          </Typography>
        </Box>

        {/* Time Left */}
        <Box display="flex" alignItems="center" mt={2}>
          <AccessTimeIcon sx={{ color: '#757575', marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Time Left: {timeLeft}
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      {/* Footer with Social Icons and Place Bid Button */}
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
            <Button variant="contained" color="primary" sx={{ borderRadius: 5 }}>
              Place Bid &raquo;
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default BiddingProductCard;
