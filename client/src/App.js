/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Navbar/Header";
import { lightTheme, darkTheme, autismTheme } from "./theme";
import Footer from "./components/Navbar/Footer";
import Landing from "./pages/Landing/Landing";

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const { i18n } = useTranslation(); // Hook to use translation

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Use i18n to change the language
    toast.success(`Language changed to ${language}`, {
      position: "bottom-left",
    }); // Show notification
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
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Routes>
                <Route path="/" exact element={<Landing />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Footer stays at the bottom */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Footer />
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
