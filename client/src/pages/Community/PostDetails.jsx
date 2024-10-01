import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CssBaseline,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  TextField,
  Avatar,
  List,
  ListItem,
  Button,
  Box,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

// Sample posts data
const posts = [
  {
    id: 1,
    title: 'Understanding Disabilities',
    content: [
      'This is a detailed post about how the world deals with disabilities, including various strategies, policies, and personal stories that highlight the challenges and triumphs of individuals with disabilities.',
      'It’s crucial to understand the different types of disabilities and the importance of inclusion in society. Many organizations are dedicated to improving the quality of life for people with disabilities.',
      'Awareness and education are key to changing perceptions and creating a more inclusive environment for everyone.',
    ],
    img: 'https://www.neils.org/wp-content/uploads/2023/10/disability-advocacy-1200x480.png.webp',
    additionalMedia: 'https://www.example.com/sample-video.mp4',
    category: 'Disabilities',
  },
  {
    id: 2,
    title: 'Health and Wellness',
    content: [
      'Latest trends in health and wellness are evolving rapidly, focusing on holistic approaches.',
      'Nutrition, mental health, and physical activity are interconnected and essential for overall well-being.',
      'Staying informed about new research can significantly impact personal health choices.',
    ],
    img: 'https://www.healtheuropa.com/wp-content/uploads/2022/08/1-iStockgorodenkoff-1335020165-696x392.jpg',
    category: 'Health',
  },
  // Other posts...
];

const PostDetails = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));
  const previousPost = posts.find((p) => p.id === parseInt(id) - 1);
  const nextPost = posts.find((p) => p.id === parseInt(id) + 1);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setComments([...comments, { text: commentText, id: comments.length }]);
      setCommentText('');
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Community Blog</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3, mb: 5 }}>
        {post ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: '15px',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={post.img}
                  alt={post.title}
                />
                <CardContent>
                  <Chip
                    label={post.category}
                    sx={{ marginBottom: '10px' }}
                    color="primary"
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    {post.title}
                  </Typography>
                  {post.content.map((para, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      {para}
                    </Typography>
                  ))}
                  {post.additionalMedia && (
                    <CardMedia
                      component="video"
                      controls
                      src={post.additionalMedia}
                      sx={{ borderRadius: '10px', mt: 2 }}
                    />
                  )}

                  {/* Navigation Icons with Post Names */}
                  <Grid
                    container
                    spacing={2}
                    sx={{ mt: 2, justifyContent: 'space-between' }}
                  >
                    {previousPost && (
                      <Grid
                        item
                        xs={6}
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <IconButton
                          component={Link}
                          to={`/our-community/post/${previousPost.id}`}
                        >
                          <ArrowBack />
                        </IconButton>
                        <Typography
                          variant="body1"
                          component={Link}
                          to={`/our-community/post/${previousPost.id}`}
                          sx={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {previousPost.title}
                        </Typography>
                      </Grid>
                    )}
                    {nextPost && (
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Typography
                          variant="body1"
                          component={Link}
                          to={`/post/${nextPost.id}`}
                          sx={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {nextPost.title}
                        </Typography>
                        <IconButton
                          component={Link}
                          to={`/post/${nextPost.id}`}
                        >
                          <ArrowForward />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar with Popular Searches */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    Popular Searches
                  </Typography>
                  <ul>
                    <li>Disability rights</li>
                    <li>Health tips</li>
                    <li>Talent showcases</li>
                    <li>Inclusive education</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Back Button */}
              <Button
                component={Link}
                to="/our-community"
                variant="outlined"
                color="primary"
                fullWidth
              >
                Back to Community
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
            Post not found
          </Typography>
        )}

        {/* Comments Section */}
        <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold' }}>
          Comments
        </Typography>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{ mt: 2, bgcolor: 'background.paper' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ mt: 1 }}
        >
          Submit
        </Button>

        <List sx={{ mt: 2, padding: 0 }}>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                py: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Avatar sx={{ marginRight: '10px', bgcolor: 'primary.main' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  User {comment.id + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.text}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default PostDetails;
