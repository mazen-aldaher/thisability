import React, { useState } from 'react';
import {
  Container, Grid, Typography, Button, Card, CardContent, CardActions, IconButton, Select, MenuItem, FormControl,
  InputLabel, CardMedia, Box
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample cart items
const sampleCartItems = [
  {
    id: 1,
    name: 'Kindle Paperwhite (8GB)',
    description: 'Now with a 6.8" display with adjustable warm light, Waterproof, Wi-Fi',
    price: 7999.00,
    image: 'https://example.com/kindle.png',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Generic Pill Organizer with 600 ml Water Bottle',
    description: 'Weekly Pill Organizer for Home and Travel BPA Free (Pink)',
    price: 144.00,
    image: 'https://example.com/pill-organizer.png',
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleProceedToBuy = () => {
    navigate('/checkout');
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Shopping Cart
          </Typography>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
              <CardMedia
                component="img"
                sx={{ width: 120, objectFit: 'cover' }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    EGP {item.price.toLocaleString()}
                  </Typography>
                  <FormControl variant="outlined" size="small" sx={{ mt: 1, minWidth: 80 }}>
                    <InputLabel>Qty</InputLabel>
                    <Select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      label="Qty"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <MenuItem key={qty} value={qty}>
                          {qty}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 2 }}>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    startIcon={<Delete />}
                    sx={{ color: '#f44336', '&:hover': { backgroundColor: 'rgba(244,67,54,0.1)' } }}
                  >
                    Delete
                  </Button>
                  <Button sx={{ color: '#1976d2', '&:hover': { backgroundColor: 'rgba(25,118,210,0.1)' } }}>
                    Save for later
                  </Button>
                </CardActions>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}): EGP {getTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2, borderRadius: '8px', padding: '12px 0', fontWeight: 'bold', transition: 'background-color 0.3s' }}
              onClick={handleProceedToBuy}
            >
              Proceed to Buy
            </Button>
            <Box sx={{ border: '1px solid #d3d3d3', padding: '10px', borderRadius: '8px' }}>
              <Typography color="green" variant="body2">
                Your order qualifies for FREE Shipping
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
