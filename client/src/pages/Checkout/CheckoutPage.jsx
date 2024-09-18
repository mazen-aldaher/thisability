import React, { useState } from 'react';
import {
  Container, Grid, Typography, Button, Card, CardContent, CardActions, Divider, TextField, FormControl, FormLabel,
  RadioGroup, Radio, FormControlLabel, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Checkout Component
const CheckoutPage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const navigate = useNavigate();  // Initialize useNavigate

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

   // Handle redirect to checkout
  const handlePlaceOrder = () => {
    navigate('/place-order');  // Redirects to place order page
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Checkout (1 item)
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Address Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                1. Shipping Address
              </Typography>
              <Typography variant="body1">
                Mazen Abdelhalim Mohamed Aldaher <br />
                Capital Business Park, Sheikh Zayed, el hay 2 Floor 6, Company 606, B2, Capital Business Park, Sheikh Zayed <br />
                Giza, 6th of October City, 2nd District
              </Typography>
              <Button variant="text" color="primary" sx={{ marginTop: '10px' }}>
                Change
              </Button>
            </CardContent>
          </Card>

          <Box mt={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  2. Choose a Payment Method
                </Typography>

                {/* Promo Code Input */}
                <Typography variant="body1" gutterBottom>
                  Your available balance
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Enter a gift card or promotional code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    size="small"
                  />
                  <Button variant="contained" color="primary" sx={{ marginLeft: '10px' }}>
                    Apply
                  </Button>
                </Box>

                <Divider sx={{ marginBottom: '20px' }} />

                {/* Payment Methods */}
                <Typography variant="body1" gutterBottom>
                  Your credit and debit cards
                </Typography>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginBottom: '20px' }}>
                  Add a credit or debit card
                </Button>

                <Divider sx={{ marginBottom: '20px' }} />

                <FormControl component="fieldset">
                  <FormLabel component="legend">Other payment options</FormLabel>
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel value="credit-card" control={<Radio />} label="Credit Card" />
                    <FormControlLabel value="buy-later" control={<Radio />} label="Buy Now, Pay Later" />
                    <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                  </RadioGroup>
                </FormControl>

                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '20px' }}>
                  Use this payment method
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="body1">
                Items: EGP 7,999.00 <br />
                Shipping & handling: -- <br />
                Total: --
              </Typography>

              <Divider sx={{ marginY: '20px' }} />

              <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder} >
                Place your order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
