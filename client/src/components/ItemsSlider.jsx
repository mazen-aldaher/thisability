/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Typography, Button, Skeleton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import FlippingCard from "./FlippingCard"; // Assuming this is a custom component
import cardImg from "../assets/ill/art-ist/card-1.png";
import flipImg from "../assets/ill/art-ist/flip-1.png";

const categories = [
  { id: 1, title: "paint", color: "orange" },
  { id: 2, title: "handmade", color: "lightBlue" },
  { id: 3, title: "art", color: "green" }
];

const data = [
  {
    id: 1,
    category: "paint",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "Mazen"
  },
  {
    id: 2,
    category: "handmade",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "Mazen"
  },
  {
    id: 3,
    category: "art",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "Mazen"
  },
  {
    id: 4,
    category: "paint",
    frontTitle: "Take a look at my Ability",
    artistImg: flipImg, // Add URL for the artist image
    artImg: cardImg, // Add URL for the art image
    backTitle: "Back of the card",
    artistName: "Mazen"
  }
];

const ItemsSlider = () => {
  const [products, setProducts] = useState([]); // Initially no products
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setProducts(data); // Load the actual data
      setLoading(false); // Disable loading
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Function to get color based on category
  const getCategoryColor = (category) => {
    const foundCategory = categories.find((cat) => cat.title === category);
    return foundCategory ? foundCategory.color : "gray"; // Default to gray if not found
  };

  return (
    <Container maxWidth="lg">
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
                backgroundColor:"orange"
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="100%" />
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
) : products.length > 0 ? (
  <Slider {...sliderSettings}>
    {products.map((product) => (
      <Box key={product.id} sx={{ px: { xs: 1, sm: 2 } }}>
        <NavLink
          to={`/products/${product.id}`}
          style={{ textDecoration: "none" }}
        >
          <FlippingCard
            Category={product.category ? product.category : "Unknown"}
            ArtImg={product.artImg}
            FrontTitle={product.frontTitle}
            ArtistImg={product.artistImg}
            BackTitle={product.backTitle}
            ArtistName={
              product.artistName ? product.artistName : "Unknown Artist"
            }
            backgroundColor={getCategoryColor(product.category)} // Pass background color
          />
        </NavLink>
      </Box>
    ))}
  </Slider>
) : (
  <Box textAlign="center" mt={4}>
    <Typography variant="h6" gutterBottom>
      There are no products available. Please add some from the link below:
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
    </Container>
  );
};

export default ItemsSlider;
