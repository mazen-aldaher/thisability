import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import BiddingProductCard from './BiddingProductCard'; // You may need to extend ProductCard to handle bidding logic

const BiddingArchiveList = () => {
  const [visibleItems, setVisibleItems] = useState(4); // Initial number of products to display
  const [isFetching, setIsFetching] = useState(false); // To control loading more products
  const [hasMoreItems, setHasMoreItems] = useState(true); // To control if more items are available
  const theme = useTheme();

  // Bidding product data (example)
  const biddingData = [
    {
      id: 1,
      productTitle: 'Exclusive Artwork 1',
      description: 'A masterpiece up for bidding.',
      artImg: 'https://example.com/artwork1.jpg',
      startingPrice: 5000,
      currentBid: 7500,
      bidEndTime: '2024-09-30T23:59:59', // Bid end time
      artistName: 'Artist One',
      bidIncrement: 200,
    },
    {
      id: 2,
      productTitle: 'Handmade Sculpture',
      description: 'A rare piece of art for bidding.',
      artImg: 'https://example.com/sculpture.jpg',
      startingPrice: 3000,
      currentBid: 5000,
      bidEndTime: '2024-09-25T20:00:00',
      artistName: 'Artist Two',
      bidIncrement: 100,
    },
    // Add more bidding products as needed
  ];

  // Display only the products up to the current visible count
  const visibleProducts = biddingData.slice(0, visibleItems);

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

  useEffect(() => {
    if (isFetching) {
      // Check if more products are available to load
      if (visibleItems < biddingData.length) {
        setTimeout(() => {
          setVisibleItems((prevVisible) => prevVisible + 4); // Load 4 more items
          setIsFetching(false);
        }, 1000); // Simulate loading time
      } else {
        setHasMoreItems(false); // No more products to load
        setIsFetching(false);
      }
    }
  }, [isFetching, visibleItems, biddingData.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasMoreItems]);

  return (
    <>
      {/* Bidding product list */}
      <Box
        sx={{
          my: 1,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
  
        }}
      >
        {visibleProducts.map((product) => {
          // Calculate remaining bid time
          const bidEndTime = new Date(product.bidEndTime);
          const remainingTime = Math.max(bidEndTime - new Date(), 0);
          const timeLeft =
            remainingTime > 0
              ? `${Math.floor(
                  remainingTime / (1000 * 60 * 60)
                )} hours remaining`
              : 'Bidding has ended';

          return (
            <Box key={product.id} sx={{ mx: 1, my: 1 }}>
              <BiddingProductCard
                artImg={product.artImg}
                productTitle={product.productTitle}
                description={product.description}
                price={product.currentBid} // Show current bid price
                artistName={product.artistName}
                timeLeft={timeLeft} // Show remaining time for bidding
                link={`/bidding/${product.id}`} // Link to detailed bidding page
                isBidding={true} // Flag to indicate it's a bidding product
              />
            </Box>
          );
        })}
      </Box>

      {/* Show loading indicator when fetching */}
      {isFetching && <p>Loading more bidding products...</p>}

      {/* Show "No more products" message when all products are loaded */}
      {!hasMoreItems && <p>Thats all for today :)</p>}
    </>
  );
};

export default BiddingArchiveList;
