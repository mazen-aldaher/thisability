import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import DashboardLayout from './pages/Dashboards/DashboardLayout';
import ActiveBids from './pages/Dashboards/USerDashboardRoutes.js/ActiveBids';
import PurchaseHistory from './pages/Dashboards/USerDashboardRoutes.js/PurchaseHistory';
import Watchlist from './pages/Dashboards/USerDashboardRoutes.js/Watchlist';
import ProfileSettings from './pages/Dashboards/USerDashboardRoutes.js/ProfileSettings';
import BidHistory from './pages/Dashboards/USerDashboardRoutes.js/BidHistory';
import Messages from './pages/Dashboards/USerDashboardRoutes.js/Messages';
import ReviewsFeedback from './pages/Dashboards/USerDashboardRoutes.js/ReviewsFeedback';
import SavedSearches from './pages/Dashboards/USerDashboardRoutes.js/SavedSearches';
import Main from './pages/Dashboards/USerDashboardRoutes.js/Main';
import DisputeResolution from './pages/Dashboards/USerDashboardRoutes.js/DisputeResolution';
import AuctionStrategy from './pages/Dashboards/USerDashboardRoutes.js/AuctionStrategy';
import AutoBiding from './pages/Dashboards/USerDashboardRoutes.js/AutoBiding';
import BidInsights from './pages/Dashboards/USerDashboardRoutes.js/BidInsights';
import DefaultLayout from './layout/DefaultLayout';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreens from './screens/OnboardingScreens';
import ScrollToTop from './hooks/ScrollToTop';
import axios from 'axios';
import Profile from './pages/Profile/Profile';
import SellerOrdersPage from './pages/OrdersPage/OrdersPage';
import VerifyEmail from './pages/Auth/components/VerifyEmail';
import ResetPassword from './pages/Auth/ResetPassword';
import Admins from './pages/Dashboards/Admin/Admins';
import Artists from './pages/Dashboards/Artists/Artists';
import Clients from './pages/Dashboards/Clients/Clients';
import Organizations from './pages/Dashboards/Organizations/Organizations';
import { useAuth } from './context/AuthContext';
import VerificationPage from './pages/Disability Verification Page/VerificationPage';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false); // State to handle onboarding flow
  const token = localStorage.getItem('token');
  // eslint-disable-next-line
  const {user, setUser} = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await axios.get(
            'http://localhost:5000/api/user/profile',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(data);
        } catch (error) {
          console.error('Error fetching user', error);
        }
      }
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      if (onboardingCompleted) {
        setShowOnboarding(false);
      }
    }, 10000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);
  // Function to handle when the loading is complete
  const handleLoadingComplete = () => setLoading(false);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    toast.success(t(`Language changed to ${language}`), {
      position: 'bottom-left',
    });
  };

  const shouldShowNavbarFooter = ![
    '/login',
    '/register',
    // Other excluded routes
    '/test',
    '/onboarding',
    '/dashboard/admin',
    '/dashboard/admin/main',
    '/dashboard/admin/support',
    '/dashboard/admin/users/',
    '/dashboard/admin/users/admins',
    '/dashboard/admin/users/artists',
    '/dashboard/admin/users/clients',
    '/dashboard/admin/users/organizations',
    '/dashboard/admin/products/',
    '/dashboard/admin/products/create',
    '/dashboard/admin/products/orders',
    '/dashboard/admin/products/bidding',
    '/dashboard/admin/products/categories',
    '/dashboard/admin/products/one-time-purchase',
    '/dashboard/admin/blog/posts',
    '/dashboard/admin/blog/posts/new',
    '/dashboard/admin/blog/posts/categories',
    '/dashboard/admin/profile',
    '/dashboard/admin/settings',
    '/dashboard/admin/docs',
    // More routes here...
  ].includes(location.pathname);

  return (
    <>
      {loading ? (
        <SplashScreen onLoadingComplete={handleLoadingComplete} />
      ) : showOnboarding ? (
        <OnboardingScreens onComplete={handleOnboardingComplete} />
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollToTop />{' '}
          {/* Add ScrollToTop component for smooth navigation */}
          <Box display="flex" flexDirection="column" minHeight="100vh">
            {shouldShowNavbarFooter && (
              <Header
                onThemeChange={handleThemeChange}
                onLanguageChange={handleLanguageChange}
              />
            )}
            <Box flexGrow={1}>
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
                    <Route path="/order-tracking" element={<OrderTracking />} />
                    <Route path="/our-community" element={<Community />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route
                      path="/seller-orders"
                      element={<SellerOrdersPage />}
                    />

                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route
                      path="/our-community/post/:id"
                      element={<SinglePostPage />}
                    />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verfication-seller" element={<VerificationPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                      path="/dashboard/admin/*"
                      element={
                        <DefaultLayout onThemeChange={handleThemeChange}>
                          <Routes>
                            <Route path="main" element={<Main />} />
                            <Route path="support" element={'support'} />
                            <Route path="users/admins" element={<Admins />} />
                            <Route path="users/artists" element={<Artists />} />
                            <Route path="users/clients" element={<Clients />} />
                            <Route
                              path="users/organizations"
                              element={<Organizations />}
                            />
                            <Route path="products" element={'products'} />
                            <Route
                              path="products/create"
                              element={'products'}
                            />
                            <Route path="products/orders" element={'orders'} />
                            <Route
                              path="products/bidding"
                              element={'bidding'}
                            />
                            <Route
                              path="products/categories"
                              element={'categories'}
                            />
                            <Route
                              path="products/one-time-purchase"
                              element={'OT-Purchase'}
                            />
                            <Route path="blog/posts" element={'posts'} />
                            <Route
                              path="blog/posts/create"
                              element={'Create Post'}
                            />
                            <Route
                              path="blog/posts/categories"
                              element={'categories'}
                            />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={'settings'} />
                            <Route path="docs" element={'docs'} />
                          </Routes>
                        </DefaultLayout>
                      }
                    />
                    <Route
                      path="/dashboard/artist"
                      element={
                        <DefaultLayout onThemeChange={handleThemeChange}>
                          <Routes>
                            <Route path="/" element={<Main />} />
                          </Routes>
                        </DefaultLayout>
                      }
                    />

                    <Route
                      path="/user-dashboard/*"
                      element={
                        <DashboardLayout onThemeChange={handleThemeChange}>
                          <Routes>
                            <Route path="/" element={<Main />} />
                            <Route
                              path="active-bids"
                              element={<ActiveBids />}
                            />
                            <Route
                              path="purchase-history"
                              element={<PurchaseHistory />}
                            />
                            <Route path="watchlist" element={<Watchlist />} />
                            <Route
                              path="profile-settings"
                              element={<ProfileSettings />}
                            />
                            <Route
                              path="bid-history"
                              element={<BidHistory />}
                            />
                            <Route path="messages" element={<Messages />} />
                            <Route
                              path="reviews-feedback"
                              element={<ReviewsFeedback />}
                            />
                            <Route
                              path="saved-searches"
                              element={<SavedSearches />}
                            />
                            <Route
                              path="dispute-resolution"
                              element={<DisputeResolution />}
                            />
                            <Route
                              path="auction-strategy-analytics"
                              element={<AuctionStrategy />}
                            />
                            <Route
                              path="auto-bidding"
                              element={<AutoBiding />}
                            />
                            <Route
                              path="bid-insights"
                              element={<BidInsights />}
                            />
                          </Routes>
                        </DashboardLayout>
                      }
                    />
                    <Route path="/my-profile" element={<Profile />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </Box>
            {shouldShowNavbarFooter && (
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Footer />
              </Box>
            )}
          </Box>
          <ToastContainer />
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
