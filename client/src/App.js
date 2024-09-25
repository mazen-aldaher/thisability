import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Correct import
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Navbar/Header';
import { lightTheme } from './theme';
import Footer from './components/Navbar/Footer';
import Landing from './pages/Landing/Landing';
import StoreArchive from './pages/Store/StoreArchive';
import BiddingArchive from './pages/Store/BiddingArchive';
import ArtistPage from './pages/Artist/ArtistPage';
import ArtistArchive from './pages/Artists/ArtistArchive';
import ProductDetails from './pages/Store/ProductDetails';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import AboutPage from './pages/About/AboutPage';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const { i18n, t } = useTranslation(); // Get 't' from useTranslation

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Use i18n to change the language
    toast.success(t(`Language changed to ${language}`), {
      // Use `t` for translations
      position: 'bottom-left',
    });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Main container with flex to ensure layout height logic */}
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh" // Full viewport height
      >
        <Header
          onThemeChange={handleThemeChange}
          onLanguageChange={handleLanguageChange}
        />

        {/* Content area, grow to take available space */}
        <Box>
          <AnimatePresence>
            <motion.div>
              <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path="/products" element={<StoreArchive />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/bidding" element={<BiddingArchive />} />
                <Route path="/artists" element={<ArtistArchive />} />
                <Route path="/artists/:id" element={<ArtistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/order-tracking" element=<OrderTracking /> />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Footer stays at the bottom */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Footer />
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
