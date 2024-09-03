import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Navbar/Header";
import { lightTheme } from "./theme";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onThemeChange={handleThemeChange} />

      <AnimatePresence>
        <motion.div>
          <Box>
            <Typography textAlign="center" variant="h1">
              App
            </Typography>
          </Box>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
