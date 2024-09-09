
import React from "react";
import { Box, Container } from "@mui/material";
import HeroSection from "./components/HeroSection";
import CtaSection from "./components/CtaSection";
import NewsFeeds from "../Blog/components/NewsFeeds";
import SectionTitle from "../../components/SectionTitle";
import TestProductSliderComponent from "./components/ProductSliderComponent";

const Landing = () => {
  return (
    <Box>
      <HeroSection />
      <SectionTitle />  
      <CtaSection />
      <NewsFeeds />
    </Box>
  );
};

export default Landing;
