import React, { useState } from 'react';
import cardImg from '../../../assets/ill/art-ist/card-1.png';
import flipImg from '../../../assets/ill/art-ist/flip-1.png';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import ProductCard from './ProductCard';
import BiddingProductCard from './BiddingProductCard';

const ProductArchiveList = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredItems = items.filter(
    (product) =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artistName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const categories = [
    { id: 1, title: 'All', color: 'gray' },
    { id: 2, title: 'paint', color: 'orange' },
    { id: 3, title: 'handmade', color: 'lightBlue' },
    { id: 4, title: 'art', color: 'green' },
  ];

  const data = [
    {
      id: 1,
      category: 'paint',
      frontTitle: 'Take a look at my Ability',
      artistImg: flipImg, // Add URL for the artist image
      artImg: cardImg, // Add URL for the art image
      backTitle: 'Back of the card',
      artistName: 'Mazen',
    },
    {
      id: 2,
      category: 'handmade',
      frontTitle: 'Take a look at my Ability',
      artistImg: flipImg, // Add URL for the artist image
      artImg: cardImg, // Add URL for the art image
      backTitle: 'Back of the card',
      artistName: 'dodo',
    },
    {
      id: 3,
      category: 'art',
      frontTitle: 'Take a look at my Ability',
      artistImg: flipImg, // Add URL for the artist image
      artImg: cardImg, // Add URL for the art image
      backTitle: 'Back of the card',
      artistName: 'ssn',
    },
    {
      id: 4,
      category: 'paint',
      frontTitle: 'Take a look at my Ability',
      artistImg: flipImg, // Add URL for the artist image
      artImg: cardImg, // Add URL for the art image
      backTitle: 'Back of the card',
      artistName: 'sssen',
    },
    {
      id: 5,
      category: 'art',
      frontTitle: 'Take a look at my Ability',
      artistImg: flipImg, // Add URL for the artist image
      artImg: cardImg, // Add URL for the art image
      backTitle: 'Back of the card',
      artistName: 'sssen',
    },
    {
      id: 6,
      category: 'art',
      frontTitle: 'Take a look at my Ability',
      artistImg: flipImg, // Add URL for the artist image
      artImg: cardImg, // Add URL for the art image
      backTitle: 'Back of the card',
      artistName: 'sssen',
    },
  ];
  return (
    <>
      <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.title ? 'contained' : 'outlined'
            }
            sx={{ mx: 1, color: theme.palette.secondary.main }}
            onClick={() => handleCategoryChange(category.title)}
          >
            {category.title}
          </Button>
        ))}
      </Box>

      <Box sx={{ my: 1 ,display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />

      </Box>
    </>
  );
};

export default ProductArchiveList;
