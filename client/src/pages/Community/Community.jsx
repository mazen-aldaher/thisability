import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Button,
  TextField,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Posts data with categories
const posts = [
  {
    id: 1,
    title: 'Understanding Disabilities',
    content: 'How the world deals with disabilities.',
    img: 'https://www.neils.org/wp-content/uploads/2023/10/disability-advocacy-1200x480.png.webp',
    category: 'Disabilities',
  },
  {
    id: 2,
    title: 'Health and Wellness',
    content: 'Latest trends in health and wellness.',
    img: 'https://www.healtheuropa.com/wp-content/uploads/2022/08/1-iStockgorodenkoff-1335020165-696x392.jpg',
    category: 'Health',
  },
  {
    id: 3,
    title: 'Inclusive Education for All',
    content:
      'Exploring the latest approaches to creating inclusive educational environments for diverse learners.',
    img: 'https://www.worldbank.org/content/dam/photos/780x439/2019/mar-5/IEI_PIC_780p.png',
    category: 'Education',
  },
  {
    id: 4,
    title: 'Unleashing Creative Potential',
    content:
      'Showcasing how individuals are discovering and nurturing their creative talents across various art forms.',
    img: 'https://www.shutterstock.com/image-photo/devoted-handicapped-man-playing-musical-260nw-551426821.jpg',
    category: 'Talents',
  },
];

const popularSearches = [
  'Disability rights',
  'Health tips',
  'Talent showcases',
  'Inclusive education',
];

const trendingPosts = [
  'Inclusive Design in Tech',
  'New Approaches to Mental Health',
  'Spotlight on Paralympic Games',
];

const categories = ['All', 'Disabilities', 'Health', 'Talents', 'Education'];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);

  // Handle category tab change
  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  // Filter posts based on active category
  const filteredPosts = posts.filter((post) => {
    // If 'All' category is selected, show all posts
    if (categories[activeCategory] === 'All') return true;

    // Otherwise, filter by category
    return post.category === categories[activeCategory];
  });

  // Further filter posts based on the search term
  const displayedPosts = filteredPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CssBaseline />

      {/* Search Bar */}
      <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
        <TextField
          label="Search Posts"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search Posts"
        />
      </Container>

      {/* Category Bar */}
      <AppBar position="static" color="default">
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Category Tabs"
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mb: 5 }}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {/* Posts Section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {displayedPosts.map((post) => (
                <Grid item xs={12} sm={6} key={post.id}>
                  <Card
                    sx={{
                      borderRadius: '15px',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={post.img}
                      alt={post.title}
                      sx={{
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    />
                    <CardContent>
                      {/* Category Chip */}
                      <Chip
                        label={post.category}
                        sx={{ marginBottom: '10px' }}
                        color="primary"
                      />

                      {/* Title */}
                      <Typography
                        variant="h5"
                        component="h2"
                        tabIndex="0"
                        sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                      >
                        <Link to={`/our-community/post/${post.id}`}>{post.title}</Link>
                      </Typography>

                      {/* Content */}
                      <Typography
                        variant="body2"
                        tabIndex="0"
                        color="textSecondary"
                      >
                        {post.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Popular Searches */}
            <Card style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6" component="h2" tabIndex="0">
                  Popular Searches
                </Typography>
                <ul>
                  {popularSearches.map((search, index) => (
                    <li key={index} tabIndex="0">
                      {search}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Trending Section */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" tabIndex="0">
                  Trending Topics
                </Typography>
                <ul>
                  {trendingPosts.map((trending, index) => (
                    <li key={index} tabIndex="0">
                      {trending}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Community;
