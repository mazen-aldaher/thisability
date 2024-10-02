import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Correct import
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import Community from './pages/Community/Community';
import SinglePostPage from './pages/Community/PostDetails';
import SupportPage from './pages/Support/SupportPage';
import FAQPage from './pages/Faq/FAQPage';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Register from './pages/Auth/Register';
import UserDashboard from './pages/Dashboards/UserDashboard';
import DashboardLayout from './pages/Dashboards/DashboardLayout';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const { i18n, t } = useTranslation(); // Get 't' from useTranslation
  const location = useLocation(); // Get the current route

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
  const shouldShowNavbarFooter = ![
    '/login',
    '/register',
    '/dashboard/admin',
    '/dashboard/admin/main',
    '/dashboard/admin/users',
    '/dashboard/admin/products',
    '/dashboard/admin/orders',
    '/dashboard/admin/community',
    '/dashboard/admin/settings',
    '/dashboard/admin/artists',
    '/dashboard/admin/requests',
    '/test',
    '/onboarding/become-an-artist',
    '/onboarding',
    '/home',
    '/dashboard',
    '/user-dashboard',
  ].includes(location.pathname);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Main container with flex to ensure layout height logic */}
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh" // Full viewport height
      >
        {shouldShowNavbarFooter && (
          <Header
            onThemeChange={handleThemeChange}
            onLanguageChange={handleLanguageChange}
          />
        )}

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
                <Route path="/our-community" element=<Community /> />
                <Route path="/support" element=<SupportPage /> />
                <Route
                  path="/our-community/post/:id"
                  element=<SinglePostPage />
                />
                <Route path="/faq" element=<FAQPage /> />

                <Route path="/login" element=<Login /> />
                <Route path="/register" element=<Register /> />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />

                <Route
                  path="/dashboard"
                  element={
                    <DashboardLayout>
                      <Routes>
                        <Route path="main" element={'main'} />
                        <Route path="users" element={'users'} />
                        <Route path="artists" element={'any'} />
                      </Routes>
                    </DashboardLayout>
                  }
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Footer stays at the bottom */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {shouldShowNavbarFooter && <Footer />}
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
