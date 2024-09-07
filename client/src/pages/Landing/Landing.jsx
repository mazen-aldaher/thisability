/* eslint-disable spaced-comment */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import VerticalDotsNavigation from "../../components/VerticalDotsNavigation";
import Section from "../../components/Section";
import HeroSection from "./components/HeroSection";
import CtaSection from "./components/CtaSection";
import ItemsSlider from "../../components/ItemsSlider";
import NewsFeeds from "../Blog/components/NewsFeeds";
const sections = ["section-1", "section-2", "section-3"];
const Landing = () => {


  return (
    <Box>
        <HeroSection />
        <CtaSection />
        <NewsFeeds />
    </Box>
  );
};

export default Landing;
