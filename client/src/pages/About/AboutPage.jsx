import React from 'react';
import ArtBridge from './components/ArtBridge';
import OurStory from './components/OurStory';
import MissionVision from './components/MissionVision';
import FunFacts from './components/FunFacts';
import QuoteSection from './components/QuoteSection';
import JoinUs from './components/JoinUs';
import ReachOurTeam from './components/ReachOurTeam';
import card8 from "../../assets/ill/art-ist/card-8.png"
import card1 from "../../assets/ill/art-ist/card-1.png"
import card7 from "../../assets/ill/art-ist/card-7.png"
import card4 from "../../assets/ill/art-ist/card-4.png"

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Mazyad Adbullah',
      position: 'CEO',
      imageUrl: '../assets/mazyad.jpg',
    },
    {
      name: 'Abdulrahman Alhajri',
      position: 'Board Member',
      imageUrl: '../assets/abdulrahman.jpg',
    },
    {
      name: 'Abdulrahman',
      position: 'Board Member',
      imageUrl: '../assets/abdulrahman1.jpg',
    },
    {
      name: 'Asaad Asaad',
      position: 'Board Member',
      imageUrl: '../assets/asaad.jpg',
    },
  ];
  const products = [
    { imageUrl: card8 },
    { imageUrl: card1 },
    { imageUrl: card7 },
    { imageUrl: card4 },
  ];

  return (
    <div>
      <ArtBridge />
      <OurStory />
      <MissionVision />
      <FunFacts />
      <QuoteSection products={products} />
      <JoinUs />
      <ReachOurTeam teamMembers={teamMembers} />
    </div>
  );
};

export default AboutUs;
