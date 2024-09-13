import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ProductArtistCard from './ProductArtistCard';

const ProductsArtistList = ({ products }) => {
  const [visibleItems, setVisibleItems] = useState(3); // Initial number of products to display
  const [isFetching, setIsFetching] = useState(false); // To control loading more products
  const [hasMoreItems, setHasMoreItems] = useState(true); // To control if more items are available

  // Display only the products up to the current visible count
  const visibleProducts = products.slice(0, visibleItems);

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

  // Handle loading more items
  useEffect(() => {
    if (isFetching) {
      // Check if more products are available to load
      if (visibleItems < products.length) {
        setTimeout(() => {
          setVisibleItems((prevVisible) => prevVisible + 4); // Load 4 more items
          setIsFetching(false);
        }, 1000); // Simulate loading time
      } else {
        setHasMoreItems(false); // No more products to load
        setIsFetching(false);
      }
    }
  }, [isFetching, visibleItems, products.length]);

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasMoreItems]);

  return (
    <>
      <Grid container spacing={2}>
        {visibleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductArtistCard product={product} />
          </Grid>
        ))}
      </Grid>

      {isFetching && <p>Loading more bidding products...</p>}

      {/* Show "No more products" message when all products are loaded */}
      {!hasMoreItems && <p>That's all for today :)</p>}
    </>
  );
};

export default ProductsArtistList;
