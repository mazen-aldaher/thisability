import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const navigate = useNavigate();

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    navigate('/place-order');
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        Checkout (1 item)
      </Typography>

      <Grid container spacing={4}>
        {/* Shipping Address Section */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                1. Shipping Address
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Mazen Abdelhalim Mohamed Aldaher <br />
                Capital Business Park, Sheikh Zayed, el hay 2 Floor 6, Company
                606, B2, Capital Business Park, Sheikh Zayed <br />
                Giza, 6th of October City, 2nd District
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ marginTop: '10px', textTransform: 'none' }}
              >
                Change
              </Button>
            </CardContent>
          </Card>

          <Box mt={4}>
            <Card
              sx={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  2. Choose a Payment Method
                </Typography>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Your available balance
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Enter a gift card or promotional code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: '10px', textTransform: 'none' }}
                  >
                    Apply
                  </Button>
                </Box>

                <Divider sx={{ marginBottom: '20px' }} />

                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Your credit and debit cards
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{
                    marginBottom: '20px',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                  }}
                >
                  Add a credit or debit card
                </Button>

                <Divider sx={{ marginBottom: '20px' }} />

                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                    Other payment options
                  </FormLabel>
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    sx={{ mt: 1 }}
                  >
                    <FormControlLabel
                      value="credit-card"
                      control={<Radio />}
                      label="Credit Card"
                    />
                    <FormControlLabel
                      value="buy-later"
                      control={<Radio />}
                      label="Buy Now, Pay Later"
                    />
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Cash on Delivery"
                    />
                  </RadioGroup>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: '20px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: '12px',
                    '&:hover': { backgroundColor: '#1a73e8' },
                  }}
                >
                  Use this payment method
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Items: EGP 7,999.00 <br />
                Shipping & handling: -- <br />
                Total: --
              </Typography>

              <Divider sx={{ marginY: '20px' }} />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
                sx={{
                  fontWeight: 'bold',
                  padding: '12px',
                  '&:hover': { backgroundColor: '#1a73e8' },
                }}
              >
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
