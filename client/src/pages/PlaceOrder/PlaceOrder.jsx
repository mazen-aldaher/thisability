import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, Divider, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate(); // for navigation to other pages

  const shippingAddress = {
    name: 'Mazen Abdelhalim Mohamed Aldaher',
    addressLine1: 'Capital Business Park, Sheikh Zayed, el hay 2',
    addressLine2: 'Floor 6, Company 606, B2, Capital Business Park',
    city: 'Giza, 6th of October City, 2nd District',
  };

  const paymentMethod = 'Credit Card';
  const orderTotal = 7999.00;

  // Simulate order placement
  const handlePlaceOrder = () => {
    setIsLoading(true); // Start loading

    // Simulate an API call delay (e.g., 2 seconds)
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setIsSuccess(true); // Show success dialog
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/products'); // Redirect to home or shopping page
  };

  const handleTrackOrder = () => {
    navigate('/order-tracking'); // Redirect to order tracking page
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Place Your Order
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Address */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography variant="body1">
                {shippingAddress.name} <br />
                {shippingAddress.addressLine1} <br />
                {shippingAddress.addressLine2} <br />
                {shippingAddress.city}
              </Typography>
              <Divider sx={{ marginY: '20px' }} />

              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography variant="body1">
                {paymentMethod}
              </Typography>
              <Divider sx={{ marginY: '20px' }} />

              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              <Box>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  Kindle Paperwhite (8GB) - EGP {orderTotal.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="body1">
                Items: EGP {orderTotal.toFixed(2)} <br />
                Shipping & handling: -- <br />
                Total: EGP {orderTotal.toFixed(2)}
              </Typography>

              <Divider sx={{ marginY: '20px' }} />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? <CircularProgress size={24} /> : 'Place Your Order'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Success Dialog */}
      <Dialog
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">Order Placed Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            Your order has been placed successfully! You can continue shopping or track your order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinueShopping} color="primary">
            Continue Shopping
          </Button>
          <Button onClick={handleTrackOrder} color="primary" autoFocus>
            Track Your Order
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlaceOrder;
