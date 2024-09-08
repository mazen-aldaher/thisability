
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Typography, Button, Skeleton, Paper, IconButton, InputBase } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import FlippingCard from "./FlippingCard"; // Assuming this is a custom component
import cardImg from "../assets/ill/art-ist/card-1.png";
import flipImg from "../assets/ill/art-ist/flip-1.png";

// Categories data
const categories = [
  { id: 1, title: "All", color: "gray" }, // Add 'All' category
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

const ItemsSlider = () => {
  const [products, setProducts] = useState([]); // Initially no products
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setProducts(data); // Load the actual data
      setLoading(false); // Disable loading
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
    // Filter logic based on category and search
    const filteredProducts = products.filter((product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.artistName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: Math.min(filteredProducts.length, 3),
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 768, // Mobile screen size
          settings: {
            slidesToShow: 1, // Show only 1 card on mobile
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024, // Tablet screen size
          settings: {
            slidesToShow: 2, // Show 2 cards on tablet
            slidesToScroll: 1,
          },
        },
      ],
    };

  // Function to get color based on category
  const getCategoryColor = (category) => {
    const foundCategory = categories.find((cat) => cat.title === category);
    return foundCategory ? foundCategory.color : "gray"; // Default to gray if not found
  };



  return (
    <Box>
      {error ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="error">
            Error fetching products: {error}
          </Typography>
        </Box>
      ) : loading ? (
        // Show skeletons while loading
        <Slider {...sliderSettings}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ px: { xs: 1, sm: 2 } }}>
              <Box
                sx={{
                  width: "300px",
                  height: "400px",
                  borderRadius: "25px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Skeleton for the entire card */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    borderRadius: "25px",
                    position: "relative",
                  }}
                >
                  {/* Simulate the chip and title */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      width: "100px",
                      height: "30px",
                    }}
                  >
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      height="100%"
                      sx={{ backgroundColor: "#eded" }}
                    />
                  </Box>

                  {/* Simulate the main image */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "80px",
                      left: "50px",
                      width: "200px",
                      height: "150px",
                      backgroundColor: "orange",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </Box>

                  {/* Simulate the title text */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "80px",
                      left: "30px",
                      width: "240px",
                      height: "40px",
                    }}
                  >
                    <Skeleton variant="text" width="100%" height="100%" />
                  </Box>

                  {/* Simulate the decorative eyes element */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      width: "60px",
                      height: "30px",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width="100%"
                      height="100%"
                      sx={{ transform: "rotate(-25deg)" }}
                    />
                  </Box>
                </Skeleton>
              </Box>
            </Box>
          ))}
        </Slider>
      ) : filteredProducts.length > 0 ? (
        <>
        {/* Search bar 
      <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 420 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search products" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
        */}

      {/* Category filter buttons */}
      <Box sx={{ my: 3,display:"flex",justifyContent:"center" }}>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.title ? "contained" : "outlined"}
            sx={{ mx: 1 }}
            onClick={() => handleCategoryChange(category.title)}
          >
            {category.title}
          </Button>
        ))}
      </Box>

        <Slider {...sliderSettings}>
        {filteredProducts.map((product) => (
            <Box key={product.id} sx={{ px: 2 }}>
              <NavLink to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                <FlippingCard
                  Category={product.category}
                  ArtImg={product.artImg}
                  FrontTitle={product.frontTitle}
                  ArtistImg={product.artistImg}
                  BackTitle={product.backTitle}
                  ArtistName={product.artistName}
                  backgroundColor={categories.find(cat => cat.title === product.category)?.color || "gray"}
                />
                
              </NavLink>
            </Box>
          ))}
        </Slider>
        </>
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" gutterBottom>
            There are no products available. Please add some from the link
            below:
          </Typography>
          <Button
            component={Link}
            to="/products/add-new-product"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create Product
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ItemsSlider;
