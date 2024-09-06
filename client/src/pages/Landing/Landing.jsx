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
const sections = ["section-1", "section-2", "section-3"];
const Landing = () => {
  const [activeSection, setActiveSection] = useState("section-1");
  const sectionRefs = useRef([]);
  const isScrolling = useRef(false);
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);

    // Calculate the position to center the section on the screen
    const offset = (window.innerHeight - section.offsetHeight) / 2;
    window.scrollTo({
      top: section.offsetTop - offset,
      behavior: "smooth",
    });

    isScrolling.current = true;

    setTimeout(() => {
      isScrolling.current = false;
    }, 1000); // Adjust timeout duration if necessary
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling.current) return;

      const currentIndex = sections.indexOf(activeSection);
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        scrollToSection(sections[nextIndex]);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [activeSection]);

  return (
    <Box sx={{ position: "relative" }}>
      <VerticalDotsNavigation
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <Section id="section-1">
        <HeroSection />
      </Section>
      <Section id="section-2">
        <CtaSection />
      </Section>
      <Section id="section-3">Empty</Section>
    </Box>
  );
};

export default Landing;
