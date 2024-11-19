/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box,
  Snackbar,
  Alert,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from '@mui/material';

// Simulated tracking steps
const trackingSteps = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

const OrderTrackingWithNotification = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [orderHistory, setOrderHistory] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false); // State to control receipt visibility
  const [currentOrder, setCurrentOrder] = useState(null); // State to hold the order for printing

  const shippingAddress = {
    name: 'Mazen Abdelhalim Mohamed Aldaher',
    addressLine1: 'Capital Business Park, Sheikh Zayed, el hay 2',
    addressLine2: 'Floor 6, Company 606, B2, Capital Business Park',
    city: 'Giza, 6th of October City, 2nd District',
  };

  const orderItems = [
    { name: 'Kindle Paperwhite (8GB)', price: 7999.0 },
  ];

  const orderTotal = 7999.0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < trackingSteps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep > 0) {
      setNotification({
        open: true,
        message: `Order status updated: ${trackingSteps[currentStep]}`,
      });
    }

    if (currentStep === trackingSteps.length - 1) {
      addOrderToHistory();
      setShowReceipt(true); // Show receipt when order is delivered
    }
  }, [currentStep]);

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  const addOrderToHistory = () => {
    const newOrder = {
      id: Date.now(),
      items: orderItems,
      total: orderTotal,
      date: new Date().toLocaleString(),
    };
    setOrderHistory((prevHistory) => [...prevHistory, newOrder]);
  };

  // Handle print receipt function
  const handlePrintReceipt = (orderId) => {
    const orderToPrint = orderHistory.find((order) => order.id === orderId);
    if (orderToPrint) {
      setCurrentOrder(orderToPrint); // Set the order for printing
      window.print(); // Trigger the print dialog
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Track Your Order
      </Typography>

      <Grid container spacing={4}>
        {/* Order Tracking */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Status
              </Typography>
              <Stepper activeStep={currentStep} alternativeLabel sx={{ padding: '10px 0' }}>
                {trackingSteps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel
                      StepIconProps={{
                        sx: { color: currentStep >= index ? '#1976d2' : '#ccc' },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box mt={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Current Status: <strong>{trackingSteps[currentStep]}</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping Details */}
        {currentStep < trackingSteps.length - 1 && ( // Show only if not delivered
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Shipping Address
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {shippingAddress.name} <br />
                  {shippingAddress.addressLine1} <br />
                  {shippingAddress.addressLine2} <br />
                  {shippingAddress.city}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Order Summary */}
        {currentStep < trackingSteps.length - 1 && ( // Show only if not delivered
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Order Summary
                </Typography>
                {orderItems.map((item, index) => (
                  <Typography variant="body1" color="text.secondary" key={index}>
                    {item.name} - EGP {item.price.toFixed(2)}
                  </Typography>
                ))}
                <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold', color: '#333' }}>
                  Total: EGP {orderTotal.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Order History */}
      {orderHistory.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Order History
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="order history table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderHistory.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>EGP {order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {order.items.map((item) => item.name).join(', ')}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handlePrintReceipt(order.id)}>
                        Print Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ width: '100%' }}
      >
        <Alert onClose={handleCloseNotification} severity="info" sx={{ width: '100%', bgcolor: '#1976d2', color: '#fff' }}>
          {notification.message}
        </Alert>
      </Snackbar>

   
    </Container>
  );
};

export default OrderTrackingWithNotification;
