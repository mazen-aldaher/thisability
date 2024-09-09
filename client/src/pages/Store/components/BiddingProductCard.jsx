import React from 'react';
import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, IconButton, LinearProgress, Typography, Button, CardActions } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';

const AnimatedLinearProgress = motion(LinearProgress);

const BiddingProductCard = () => {
  const currentBid = 9600;  // Current highest bid
  const goalBid = 12000;  // Maximum or expected bid
  const timeLeft = '2h 30m'; // Time left for the auction

  // Calculate progress percentage
  const progress = (currentBid / goalBid) * 100;

  // Determine if the bid button should be disabled and text should be "Sold"
  const isBidDisabled = currentBid >= goalBid;
  const buttonText = isBidDisabled ? 'Sold' : 'Place Bid';

  // Determine progress label
  const progressLabel = isBidDisabled ? 'Bidding Completed' : 'Bidding Progress';

  return (
    <Box sx={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
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

          {/* Progress Bar */}
          <Box mt={2} sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {progressLabel}
            </Typography>
            {!isBidDisabled && (
              <AnimatedLinearProgress
                variant="buffer"
                value={progress}
                sx={{ height: 10, borderRadius: 5, mt: 1, width: '100%' }} // Ensure full width
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            )}
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2" color="text.secondary">
                ${currentBid}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${goalBid}
              </Typography>
            </Box>
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
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 5 }}
                disabled={isBidDisabled}  // Disable button if goalBid is reached
              >
                {buttonText} &raquo;
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BiddingProductCard;
