/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { Link} from "react-router-dom";
import Carousel from 'react-material-ui-carousel';




const MainSlider = ({itemsSlider,renderSlide,itemsPerSlide = 3,loadingTime =2000,categories, shouldShowCategories = true }) => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // Large screen breakpoint

  useEffect(() => {
    const timer = setTimeout(() => {
      // Remove duplicates by using Set based on unique id
      const uniqueItems = [...new Map(itemsSlider.map(item => [item.id, item])).values()];
      setItems(uniqueItems);
      setLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [itemsSlider, loadingTime]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };



  const filteredItems = items.filter((product) =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    (product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artistName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to split products into groups of 3 for large screens
   const getSlides = () => {
    const slides = [];
    const groupSize = isLargeScreen ? itemsPerSlide : 1;

    for (let i = 0; i < filteredItems.length; i += groupSize) {
      slides.push(filteredItems.slice(i, i + groupSize));
    }
    return slides;
  };

  const skeletonItems = Array.from({ length: itemsPerSlide }, (_, index) => index + 1);

  return (
    <Box>
         {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {skeletonItems.map((item) => (
            <Box key={item} sx={{ width: "300px", height: "400px" }}>
              <Skeleton variant="rectangular" width={300} height={200} />
              <Skeleton width="60%" height={30} sx={{ mt: 2 }} />
              <Skeleton width="80%" height={30} />
            </Box>
          ))}
        </Box>
      ) : (
        filteredItems.length > 0 ? (
          <>
         {shouldShowCategories && (
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
            )}

            <Container>
              <Carousel
                indicators={filteredItems.length > 1}
                autoPlay={true}
                animation="slide"
                cycleNavigation={true}
                navButtonsAlwaysVisible={true}
                duration={1000}
              >
               {getSlides().map((slide, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              
              {slide.map(item => (
                <Box key={item.id}>
                  {/* The renderSlide function renders the content for each slide */}
                  {renderSlide(item)}
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

export default MainSlider;
