import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Carousel from 'react-material-ui-carousel';
import FlippingCard from "./FlippingCard"; // Assuming this is a custom component
import cardImg from "../assets/ill/art-ist/card-1.png";
import flipImg from "../assets/ill/art-ist/flip-1.png";

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

const ItemsSlider = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // Large screen breakpoint

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 2000); // Simulating a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    (product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artistName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to split products into groups of 3 for large screens
  const getSlides = () => {
    if (isLargeScreen) {
      const slides = [];
      for (let i = 0; i < filteredProducts.length; i += 3) {
        slides.push(filteredProducts.slice(i, i + 3)); // Group by 3 for large screens
      }
      return slides;
    } else {
      return filteredProducts.map((product) => [product]); // Single slide for small screens
    }
  };

  const skeletonItems = [1, 2, 3]; // Array for skeleton placeholders

  return (
    <Box>
      {loading ? (
        <Container maxWidth="xl">
          {/* Display Skeletons while loading */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {skeletonItems.map((item) => (
              <Box key={item} sx={{ width: "300px", height: "400px" }}>
                <Skeleton variant="rectangular" width={300} height={200} />
                <Skeleton width="60%" height={30} sx={{ mt: 2 }} />
                <Skeleton width="80%" height={30} />
              </Box>
            ))}
          </Box>
        </Container>
      ) : (
        filteredProducts.length > 0 ? (
          <>
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
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

            <Container maxWidth="xl">
              <Carousel
                indicators={filteredProducts.length > 1}
                autoPlay={true}
                animation="slide"
                cycleNavigation={true}
                navButtonsAlwaysVisible={true}
                duration={1000}
              >
                {getSlides().map((slide, index) => (
                  <Box key={index} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    {slide.map((product) => (
                      <Box key={product.id}>
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
                  </Box>
                ))}
              </Carousel>
            </Container>
          </>
        ) : (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" gutterBottom>
              just for admin There are no   products available. Please add some from the link below:
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
        )
      )}
    </Box>
  );
};

export default ItemsSlider;
