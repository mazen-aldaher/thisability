/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import { Box, Container, Typography, Button, Skeleton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import PostCard from "./PostCard";

const data = [
  {
    id: 1,
    postImg: "https://images.stockcake.com/public/e/b/8/eb8b0b45-6510-46db-8e16-f26e48427624_large/focused-financial-analyst-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj",
  },
  {
    id: 2,
    postImg: "https://images.stockcake.com/public/8/9/4/8946259c-7d2e-4a7c-8f10-a9410762413a_large/cozy-library-nook-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj",
  },
  {
    id: 3,
    postImg: "https://images.stockcake.com/public/e/b/8/eb8b0b45-6510-46db-8e16-f26e48427624_large/focused-financial-analyst-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj ",
  },
  {
    id: 4,
    postImg: "https://images.stockcake.com/public/8/9/4/8946259c-7d2e-4a7c-8f10-a9410762413a_large/cozy-library-nook-stockcake.jpg",
    date: "15 Feb 2024",
    comments: "10",
    postTitle: "Lorem Ipsum Dolor Sit Amet, Faucibus Consectetur Adipinsj ",
  },
];

const PostCardSlider = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(data);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Container>
      {error ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="error">
            Error fetching posts: {error}
          </Typography>
        </Box>
      ) : loading ? (
        <Slider
          dots={sliderSettings.dots}
          infinite={sliderSettings.infinite}
          speed={sliderSettings.speed}
          slidesToShow={sliderSettings.slidesToShow}
          slidesToScroll={sliderSettings.slidesToScroll}
          autoplay={sliderSettings.autoplay}
          autoplaySpeed={sliderSettings.autoplaySpeed}
          pauseOnHover={sliderSettings.pauseOnHover}
          centerMode={sliderSettings.centerMode}
          centerPadding={sliderSettings.centerPadding}
          responsive={sliderSettings.responsive}
        >
          {data.map((_, index) => (
            <Box key={`skeleton-${index}`} sx={{ px: { xs: 1, sm: 2 } }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="400px"
                sx={{ borderRadius: "12px" }}
              />
            </Box>
          ))}
        </Slider>
      ) : posts.length > 0 ? (
        <Slider
          dots={sliderSettings.dots}
          infinite={sliderSettings.infinite}
          speed={sliderSettings.speed}
          slidesToShow={sliderSettings.slidesToShow}
          slidesToScroll={sliderSettings.slidesToScroll}
          autoplay={sliderSettings.autoplay}
          autoplaySpeed={sliderSettings.autoplaySpeed}
          pauseOnHover={sliderSettings.pauseOnHover}
          centerMode={sliderSettings.centerMode}
          centerPadding={sliderSettings.centerPadding}
          responsive={sliderSettings.responsive}
        >
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                px: { xs: 1, sm: 2 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%", // Ensure that the box takes full width
              }}
            >
              <NavLink
                to={`/products/${post.id}`}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <PostCard
                  postImg={post.postImg}
                  date={post.date}
                  comments={post.comments}
                  postTitle={post.postTitle}
                />
              </NavLink>
            </Box>
          ))}
        </Slider>
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" gutterBottom>
            There are no posts available. Please add some from the link below:
          </Typography>
          <Button
            component={Link}
            to="/products/add-new-product"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create New Post
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PostCardSlider;
