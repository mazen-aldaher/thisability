/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';

const ProductArchiveList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(4); // Initial number of products to display
  const [isFetching, setIsFetching] = useState(false); // To control loading more products
  const [hasMoreItems, setHasMoreItems] = useState(true); // To control if more items are available
  const [loading, setLoading] = useState(true); // Control initial loading state
  const theme = useTheme();

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    // Simulating a network request delay
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleItems(4); // Reset visible items when category changes
    setHasMoreItems(true); // Reset load more indicator
  };

  // Predefined product categories
  const categories = [
    { id: 1, title: 'All', color: 'gray' },
    { id: 2, title: 'paint', color: 'orange' },
    { id: 3, title: 'handmade', color: 'lightBlue' },
    { id: 4, title: 'art', color: 'green' },
  ];

       // Product data
  const data = [
    {
      id: 1,
      category: 'paint',
      productTitle: 'Take a look at my Ability',
      description:
        'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
      artImg:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      price: 9600,
      artistName: 'Mazen',
      socialMedia: [
        { id: 1, title: 'facebook', url: 'www.facebook.com' },
        { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
        { id: 3, title: 'instagram', url: 'www.instagram.com' },
      ],
    },
    {
      id: 2,
      category: 'art',
      productTitle: 'Take a look at my Ability',
      description:
        'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
      artImg:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      price: 9600,
      artistName: 'Mazen',
      socialMedia: [
        { id: 1, title: 'facebook', url: 'www.facebook.com' },
        { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
        { id: 3, title: 'instagram', url: 'www.instagram.com' },
      ],
    },
    {
      id: 3,
      category: 'paint',
      productTitle: 'Take a look at my Ability',
      description:
        'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
      artImg:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      price: 9600,
      artistName: 'Mazen',
      socialMedia: [
        { id: 1, title: 'facebook', url: 'www.facebook.com' },
        { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
        { id: 3, title: 'instagram', url: 'www.instagram.com' },
      ],
    },
    {
      id: 4,
      category: 'paint',
      productTitle: 'Take a look at my Ability',
      description:
        'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
      artImg:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      price: 9600,
      artistName: 'Mazen',
      socialMedia: [
        { id: 1, title: 'facebook', url: 'www.facebook.com' },
        { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
        { id: 3, title: 'instagram', url: 'www.instagram.com' },
      ],
    },
    {
      id: 5,
      category: 'paint',
      productTitle: 'Take a look at my Ability',
      description:
        'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
      artImg:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      price: 9600,
      artistName: 'Mazen',
      socialMedia: [
        { id: 1, title: 'facebook', url: 'www.facebook.com' },
        { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
        { id: 3, title: 'instagram', url: 'www.instagram.com' },
      ],
    },
    {
      id: 6,
      category: 'handmade',
      productTitle: 'Take a look at my Ability',
      description:
        'Welcoming new school teachers to inspire and educate, shaping a brighter future for students.',
      artImg:
        'https://www.marketchino.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/h/1/h17.jpg',
      price: 9600,
      artistName: 'Mazen',
      socialMedia: [
        { id: 1, title: 'facebook', url: 'www.facebook.com' },
        { id: 2, title: 'whatsapp', url: 'www.whatsapp.com' },
        { id: 3, title: 'instagram', url: 'www.instagram.com' },
      ],
    },
    // Add more products as needed
  ];

  // Filter products based on selected category
  const filteredItems = data.filter(
    (product) =>
      selectedCategory === 'All' || product.category === selectedCategory
  );

  // Display only the products up to the current visible count
  const visibleProducts = filteredItems.slice(0, visibleItems);

  // Handle "Show More" on scroll
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !isFetching &&
      hasMoreItems
    ) {
      setIsFetching(true);
    }
  };

  // Redirect to "All" products if no products exist for the selected category
  useEffect(() => {
    if (selectedCategory !== 'All' && filteredItems.length === 0) {
      setSelectedCategory('All');
    }
  }, [filteredItems, selectedCategory]);

  useEffect(() => {
    if (isFetching) {
      // Check if more products are available to load
      if (visibleItems < filteredItems.length) {
        setTimeout(() => {
          setVisibleItems((prevVisible) => prevVisible + 4); // Load 4 more items
          setIsFetching(false);
        }, 1000); // Simulate loading time
      } else {
        setHasMoreItems(false); // No more products to load
        setIsFetching(false);
      }
    }
  }, [isFetching, visibleItems, filteredItems.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasMoreItems]);

  return (
    <>
      {/* Category buttons */}
      <Box sx={{  display: 'flex', justifyContent: 'center' }}>
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

      {/* Product list */}
      <Box
        sx={{
          my: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Box key={index} sx={{ mx: 1, my: 1 }}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            ))
          : visibleProducts.map((product) => {
              const facebookUrl = product.socialMedia.find(
                (media) => media.title === 'facebook'
              )?.url;
              const whatsappUrl = product.socialMedia.find(
                (media) => media.title === 'whatsapp'
              )?.url;
              const instagramUrl = product.socialMedia.find(
                (media) => media.title === 'instagram'
              )?.url;

              return (
                <Box key={product.id} sx={{ mx: 1, my: 1 }}>
                  <ProductCard
                    artImg={product.artImg}
                    category={product.category}
                    productTitle={product.productTitle}
                    description={product.description}
                    price={product.price}
                    artistName={product.artistName}
                    facebookUrl={facebookUrl}
                    whatsappUrl={whatsappUrl}
                    instagramUrl={instagramUrl}
                    link={`/products/${product.id}`}
                  />
                </Box>
              );
            })}
      </Box>

      {/* Show loading indicator when fetching */}
      {isFetching && <p>Loading more products...</p>}

      {/* Show "No more products" message when all products are loaded */}
      {!hasMoreItems && <p>Thats all for today :)</p>}
    </>
  );
};

export default ProductArchiveList;
