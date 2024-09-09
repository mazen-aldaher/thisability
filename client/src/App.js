import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Correct import
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Navbar/Header';
import { lightTheme, darkTheme, autismTheme } from './theme';
import Footer from './components/Navbar/Footer';
import Landing from './pages/Landing/Landing';
import SimpleSlider from './components/SimpleSlider';
import StoreArchive from './pages/Store/StoreArchive';
const App = () => {
  const [theme, setTheme] = useState(darkTheme);
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
                <Route path="/products" exact element={<StoreArchive />} />
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
