import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
} from "@mui/material";
import blogo from "../assets/Logo.png";

const OnboardingScreens = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(true);

  const steps = [
    {
      title: "Welcome",
      content:
        "Mein lieber Leser, vielen Dank, dass Sie sich die Zeit nehmen, diese Worte zu lesen. Es ist immer eine Freude, mit Ihnen in Verbindung zu treten und unsere.",
      image: blogo,
    },
    {
      title: "About Platform",
      content:
        "Mein lieber Leser, vielen Dank, dass Sie sich die Zeit nehmen, diese Worte zu lesen. Es ist immer eine Freude, mit Ihnen in Verbindung zu treten und unsere.",
      image: blogo,
    },
    {
      title: "Join our world",
      content:
        "Mein lieber Leser, vielen Dank, dass Sie sich die Zeit nehmen, diese Worte zu lesen. Es ist immer eine Freude, mit Ihnen in Verbindung zu treten und unsere.",
      image: blogo,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      onComplete();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <Box
          component="video"
          src="https://assets.mixkit.co/videos/52237/52237-720.mp4"
          autoPlay
          loop
          muted
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => {}}
        maxWidth="lg"
        fullWidth
        disableEscapeKeyDown
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
            position: "relative",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // semi-transparent background
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
            justifyContent: "center",
            alignItems: {
              xl: "flex-start",
              lg: "flex-start",
              md: "flex-start",
              sm: "center",
              xs: "center",
            },
            pt: 5,
            px: 2,
          }}
        >
          <Box sx={{ textAlign: "center", pl: 5, pt: 5 }}>
            <Box
              component="img"
              src={steps[currentStep].image}
              alt="Onboarding"
              sx={{
                width: {
                  xl: "400px",
                  lg: "400px",
                  md: "400px",
                  sm: "250px",
                  xs: "250px",
                },
                height: "auto",
                margin: "auto",
              }}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 3,
              display: {
                xl: "block",
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          />
          <Divider
            orientation="horizontal"
            sx={{
              my: 3,
              width: "100%",
              display: {
                xl: "none",
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
              },
            }}
          />
          <Box>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    xl: "column",
                    md: "row",
                  },
                  paddingTop: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", sm: "50%", xl: "100%" },
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "darkOrange",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: {
                        xl: "35px",
                        lg: "30px",
                        md: "25px",
                        sm: "30px",
                        xs: "30px",
                      },
                    }}
                  >
                    {steps[currentStep].title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: "10px",
                    textAlign: "center",
                    px: { xs: 1 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xl: "20px",
                        lg: "20px",
                        md: "20px",
                        sm: "20px",
                        xs: "17px",
                      },
                    }}
                  >
                    {steps[currentStep].content}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{ justifyContent: "center", paddingBottom: "5%" }}
            >
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  variant="contained"
                  sx={{
                    width: "150px",
                    borderRadius: "20px",
                    backgroundColor: "darkOrange",
                  }}
                >
                  Get Started
                </Button>
              ) : (
                <>
                  {currentStep > 0 && (
                    <Button
                      onClick={previousStep}
                      variant="outlined"
                      sx={{
                        marginRight: "15%",
                        width: "150px",
                        borderRadius: "20px",
                        borderColor: "darkOrange",
                        color: "darkOrange",
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={nextStep}
                    variant="contained"
                    sx={{
                      width: "150px",
                      borderRadius: "20px",
                      backgroundColor: "darkOrange",
                    }}
                  >
                    Next
                  </Button>
                </>
              )}
            </DialogActions>
            <Box
              sx={{
                display: currentStep === steps.length - 1 ? "none" : "flex",
                justifyContent: "center",
                pt: 2,
                pb: 5,
              }}
            >
              {steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 10,
                    margin: "0 5px",
                    borderRadius: "50%",
                    backgroundColor: index === currentStep ? "green" : "gray",
                    transition: "background-color 0.3s ease",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default OnboardingScreens;
