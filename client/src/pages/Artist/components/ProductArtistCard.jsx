import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { format } from 'date-fns'; // to format the bidding end time
import { motion } from 'framer-motion'; // Import framer-motion
import { styled } from '@mui/material/styles';

const Overlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 1,
}));

const ProductArtistCard = ({ product }) => {
  const [contentVisible, setContentVisible] = useState(false); // State to toggle visibility
  const [hover, setHover] = useState(false); // State to handle hover
  const isBidProduct = !!product.bidding;
  const bidEndTime = isBidProduct ? new Date(product.bidding.bidEndTime) : null;
  const now = new Date();

  const handleMouseEnter = () => {
    setContentVisible(true); // Show content when mouse enters
    setHover(true); // Show overlay text
  };

  const handleMouseLeave = () => {
    setContentVisible(false); // Hide content when mouse leaves
    setHover(false); // Hide overlay text
  };

  return (
    <Card
      sx={{
        maxWidth: { xl: 500, xs: '100%' },
        margin: 2,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden', // Ensure smooth animations
        position: 'relative', // Positioning context for overlay
        transform: hover ? 'scale(1.1)' : 'scale(0.95)', // Scale effect on hover

      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        alt={product.productTitle}
        height="350"
        image={product.artImg}
        sx={{ cursor: 'pointer' }} // Change cursor to indicate it's interactive
      />
      <Overlay
        sx={{
          opacity: hover ? 0 : 1, // Show overlay text on hover
        }}
      >
        <Typography variant="h6">Hover Me</Typography>
      </Overlay>
      <motion.div
        initial={{ opacity: 0, height: 0 }} // Initial state hidden
        animate={{
          opacity: contentVisible ? 1 : 0,
          height: contentVisible ? 'auto' : 0,
        }} // Animate opacity and height
        transition={{ duration: 0.5 }} // Duration for the animation
        style={{ overflow: 'hidden' }} // Hide overflowing content during animation
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {/* Condition for "Bid Product" */}
            {isBidProduct ? (
              <Box>
                <Typography variant="h6" color="primary">
                  Current Bid: ${product.bidding.currentBid}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bidding Ends: {format(bidEndTime, 'yyyy-MM-dd HH:mm:ss')}
                </Typography>
                <Typography variant="body2">
                  Total Bids: {product.bidding.numberOfBids}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6">Price: ${product.price}</Typography>
            )}

            {/* Condition for "On Time Product" */}
            {isBidProduct && bidEndTime > now ? (
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Place a Bid
              </Button>
            ) : (
              <Button variant="contained" color="success" sx={{ mt: 2 }}>
                Buy Now
              </Button>
            )}
          </Box>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default ProductArtistCard;
