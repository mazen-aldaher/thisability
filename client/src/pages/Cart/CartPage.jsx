import React, { useState } from 'react';
import {
  Container, Grid, Typography, Button, Card, CardContent, CardActions, IconButton, Select, MenuItem, FormControl,
  InputLabel, CardMedia, Box
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

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
  const navigate = useNavigate();  // Initialize useNavigate

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

  // Handle redirect to checkout
  const handleProceedToBuy = () => {
    navigate('/checkout');  // Redirects to checkout page
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    EGP {item.price}
                  </Typography>
                  <FormControl variant="outlined" size="small" sx={{ mt: 1 }}>
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
                <CardActions>
                  <Button onClick={() => handleRemove(item.id)} startIcon={<Delete />}>
                    Delete
                  </Button>
                  <Button>Save for later</Button>
                </CardActions>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}): EGP {getTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleProceedToBuy}  // Attach the redirect handler to the button
            >
              Proceed to Buy
            </Button>
            <Box sx={{ border: '1px solid #d3d3d3', padding: '10px', mb: 2 }}>
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
