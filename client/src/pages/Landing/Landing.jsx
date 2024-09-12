
import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./components/HeroSection";
import CtaSection from "./components/CtaSection";
import NewsFeeds from "../Blog/components/NewsFeeds";
import SectionTitle from "../../components/SectionTitle";

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
