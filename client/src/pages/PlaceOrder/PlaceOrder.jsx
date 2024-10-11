import React, { useState } from 'react';
import {
  Container, Grid, Typography, Button, Card, CardContent, Divider, Box, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const shippingAddress = {
    name: 'Mazen Abdelhalim Mohamed Aldaher',
    addressLine1: 'Capital Business Park, Sheikh Zayed, el hay 2',
    addressLine2: 'Floor 6, Company 606, B2, Capital Business Park',
    city: 'Giza, 6th of October City, 2nd District',
  };

  const paymentMethod = 'Credit Card';
  const orderTotal = 7999.00;

  const handlePlaceOrder = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleTrackOrder = () => {
    navigate('/order-tracking');
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Place Your Order
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Address Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Shipping Address
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {shippingAddress.name} <br />
                {shippingAddress.addressLine1} <br />
                {shippingAddress.addressLine2} <br />
                {shippingAddress.city}
              </Typography>
              <Divider sx={{ marginY: '20px' }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Payment Method
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {paymentMethod}
              </Typography>
              <Divider sx={{ marginY: '20px' }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Items
              </Typography>
              <Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Kindle Paperwhite (8GB) - EGP {orderTotal.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              <Typography variant="body1" color="text.secondary">
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
                disabled={isLoading}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '12px',
                  backgroundColor: isLoading ? 'rgba(25, 118, 210, 0.5)' : '#1976d2',
                  '&:hover': { backgroundColor: '#1a73e8' },
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Place Your Order'}
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
        <DialogTitle id="success-dialog-title" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
          Order Placed Successfully
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description" sx={{ color: '#333' }}>
            Your order has been placed successfully! You can continue shopping or track your order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleContinueShopping}
            color="primary"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            Continue Shopping
          </Button>
          <Button
            onClick={handleTrackOrder}
            color="primary"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
            autoFocus
          >
            Track Your Order
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlaceOrder;
