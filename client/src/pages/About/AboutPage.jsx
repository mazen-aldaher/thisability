import React from "react";
import ArtBridge from "./components/ArtBridge";
import OurStory from "./components/OurStory";
import MissionVision from "./components/MissionVision";
import FunFacts from "./components/FunFacts";
import QuoteSection from "./components/QuoteSection";
import JoinUs from "./components/JoinUs";
import ReachOurTeam from "./components/ReachOurTeam";


const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mazyad Adbullah",
      position: "CEO",
      imageUrl: "../assets/mazyad.jpg",
    },
    {
      name: "Abdulrahman Alhajri",
      position: "Board Member",
      imageUrl: "../assets/abdulrahman.jpg",
    },
    {
      name: "Abdulrahman",
      position: "Board Member",
      imageUrl: "../assets/abdulrahman1.jpg",
    },
    {
      name: "Asaad Asaad",
      position: "Board Member",
      imageUrl: "../assets/asaad.jpg",
    },
  ];

  return (
    <div>
      <ArtBridge />
      <OurStory />
      <MissionVision />
      <FunFacts />
      <QuoteSection />
      <JoinUs />
      <ReachOurTeam teamMembers={teamMembers} />
    </div>
  );
};

export default AboutUs;
