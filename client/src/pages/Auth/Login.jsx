import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Prevent overflow
        backgroundColor: "#f0f0f0", // Light background for better contrast
      }}
    >
      <Grid container>
        <Grid item xl={3} lg={4} md={4} sm={12} xs={12}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white", // White background for login form
                borderRadius: "20px", // Rounded corners for aesthetics
                boxShadow: 3, // Subtle shadow for depth
                padding: { xs: 2, sm: 4 }, // Responsive padding
              }}
            >
              <Box
                component="img"
                sx={{ mb: 4, width: "70%", maxWidth: "300px" }} // Responsive logo size
                src={Logo}
                alt="Logo"
              />
              <LoginForm />
            </Box>
          </motion.div>
        </Grid>
        <Grid
          item
          xl={9}
          lg={8}
          md={8}
          sm={12}
          xs={12}
          sx={{
            backgroundImage: `url(https://img.freepik.com/free-photo/abstract-design-background-smooth-flowing-lines_1048-14640.jpg?w=1060&t=st=1723579760~exp=1723580360~hmac=329235a02d1614c13f746bda1c2b68d8a01afed116ce64bb722bddde48cb5128)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            position: "relative", // Position relative for overlay
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for contrast
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Container maxWidth="lg">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      lineHeight: "50px",
                    }}
                  >
                    Unlock the power of Thisability
                    <br /> with Vector Search
                  </Typography>
                </Box>
                <Box sx={{ paddingTop: "20px" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      lineHeight: "30px",
                      marginBottom: 2, // Add some spacing below the text
                    }}
                  >
                    Introducing Vector Search. Build
                    <br /> intelligent applications powered <br /> by semantic
                    search and generative <br />
                    AI over any type of data.
                  </Typography>
                </Box>
                <Box sx={{ paddingTop: "3%" }}>
                  <NavLink to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#fff",
                        borderBottom: "1px solid #fff",
                        transition: "color 0.3s, transform 0.3s",
                        "&:hover": {
                          color: "#ffd700", // Gold color on hover
                          transform: "scale(1.05)", // Slightly scale up on hover
                        },
                      }}
                    >
                      Learn More
                    </Typography>
                  </NavLink>
                </Box>
              </motion.div>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
