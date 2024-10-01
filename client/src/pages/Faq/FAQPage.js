import React from 'react';
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What is the purpose of this blog?',
    answer:
      'This blog aims to share insights and stories about disabilities, health, gifts, and talents, focusing on how the world addresses these important topics.',
  },
  {
    question: 'How can I contribute to the blog?',
    answer:
      'You can contribute by submitting your stories, articles, or insights through our contact form or by emailing us directly. We value community contributions!',
  },
  {
    question: 'Are the posts on this blog verified?',
    answer:
      'Yes, all posts are reviewed and verified by our editorial team before being published to ensure accurate and reliable information.',
  },
  {
    question: 'How can I stay updated with the latest posts?',
    answer:
      'You can subscribe to our newsletter or follow us on social media to receive updates and stay informed about our latest posts and community events.',
  },
];

const FAQPage = () => {
  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          mt: 4,
          mb: 4,
          minHeight: { xl: '70vh', md: '70vh', sm: 'auto' },
        }}
      >
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={6} xl={5}>
           <Typography variant="h4" component="h2" tabIndex="0" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://media.istockphoto.com/id/1337475990/photo/q-and-a-question-and-answer-shot-form-on-wooden-block.webp?s=1024x1024&w=is&k=20&c=IPZ7t_HU1V7D-gIy200s1R5FgFZdNaWXl5XD6SLB8Z0="
                alt="Description of the blog content"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
            </Box>
          </Grid>

          {/* FAQ Content Section */}
          <Grid item xs={12} md={6} xl={7}>
           
            <Box sx={{ mb: 4,mt:8 }}>
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{
                      bgcolor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <Typography variant="h6" component="h3" tabIndex="0">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0 0 8px 8px',
                    }}
                  >
                    <Typography variant="body2" tabIndex="0">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FAQPage;
