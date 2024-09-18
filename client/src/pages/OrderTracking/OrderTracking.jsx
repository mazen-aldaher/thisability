import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Stepper, Step, StepLabel, Box, Snackbar, Alert } from '@mui/material';

// Simulated tracking steps
const trackingSteps = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const OrderTrackingWithNotification = () => {
  const [currentStep, setCurrentStep] = useState(0); // Simulated current step (order status)
  const [notification, setNotification] = useState({ open: false, message: '' }); // Notification state

  const shippingAddress = {
    name: 'Mazen Abdelhalim Mohamed Aldaher',
    addressLine1: 'Capital Business Park, Sheikh Zayed, el hay 2',
    addressLine2: 'Floor 6, Company 606, B2, Capital Business Park',
    city: 'Giza, 6th of October City, 2nd District',
  };

  const orderItems = [
    { name: 'Kindle Paperwhite (8GB)', price: 7999.00 },
  ];

  const orderTotal = 7999.00;

  // Simulate order status updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < trackingSteps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }, 5000); // Simulate status change every 5 seconds
    return () => clearInterval(interval);
  }, [currentStep]);

  // Show notification whenever currentStep changes
  useEffect(() => {
    if (currentStep > 0) {
      setNotification({
        open: true,
        message: `Order status updated: ${trackingSteps[currentStep]}`,
      });
    }
  }, [currentStep]);

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px',height:'100vh' }}>
      <Typography variant="h4" gutterBottom>
        Track Your Order
      </Typography>

      <Grid container spacing={4}>
        {/* Order Tracking */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Status
              </Typography>
              <Stepper activeStep={currentStep} alternativeLabel>
                {trackingSteps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box mt={3}>
                <Typography variant="body1">
                  Current Status: <strong>{trackingSteps[currentStep]}</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping Details */}
        <Grid item xs={12} md={6}>
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
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              {orderItems.map((item, index) => (
                <Typography variant="body1" key={index}>
                  {item.name} - EGP {item.price.toFixed(2)}
                </Typography>
              ))}
              <Typography variant="h6" sx={{ marginTop: '10px' }}>
                Total: EGP {orderTotal.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity="info" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderTrackingWithNotification;
