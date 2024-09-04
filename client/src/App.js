/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import Header from "./components/Navbar/Header";
import { lightTheme, darkTheme, autismTheme } from "./theme";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const { i18n } = useTranslation(); // Hook to use translation

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Use i18n to change the language
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box sx={{ height: "150vh" }}>
            <Typography textAlign="center" variant="h1">
              {t`App`}
            </Typography>
          </Box>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
