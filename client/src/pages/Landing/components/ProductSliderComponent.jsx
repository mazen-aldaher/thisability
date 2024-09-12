import React from 'react'
import MainSlider from '../../../components/MainSlider'
import cardImg from "../../../assets/ill/art-ist/card-1.png";
import flipImg from "../../../assets/ill/art-ist/flip-1.png";
import FlippingCard from '../../../components/FlippingCard';

const ProductSliderComponent = () => {

    // Categories data
const categories = [
  { id: 1, title: "All", color: "gray" },
  { id: 2, title: "paint", color: "orange" },
  { id: 3, title: "handmade", color: "lightBlue" },
  { id: 4, title: "art", color: "green" },
];

const data = [
  {
    id: 1,
    category: "paint",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "Mazen",
  },
  {
    id: 2,
    category: "handmade",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "dodo",
  },
  {
    id: 3,
    category: "art",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "ssn",
  },
  {
    id: 4,
    category: "paint",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "sssen",
  },
  {
    id: 5,
    category: "art",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "sssen",
  },
  {
    id: 6,
    category: "art",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "sssen",
  },
  
];
  return (
     <MainSlider 
      itemsSlider={data} 
      itemsPerSlide={3} 
      categories={categories}
      renderSlide={(item) => (
        <FlippingCard 
          data={item} 
          FrontTitle={item.frontTitle} 
          BackTitle={item.backTitle} 
          ArtistName={item.artistName} 
          Category={item.category} 
          ArtImg={item.artImg}
          ArtistImg={item.artistImg}
          backgroundColor={categories.find(cat => cat.title === item.category)?.color || "gray"}
          link={`/artists/${item.id}`} 
 
        />
      )} 
    />
  );
};

export default ProductSliderComponent