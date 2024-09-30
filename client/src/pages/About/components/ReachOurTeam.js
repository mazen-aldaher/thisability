import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import TeamMemberCard from './TeamMemberCard'; // Import the TeamMemberCard component

const ReachOurTeam = ({ teamMembers }) => (
  <Box
    sx={{
      backgroundColor: '#333', // Darker background for contrast
      py: '10vh', // Unified padding for top and bottom
      height: '100%',
    }}
  >
    <Container maxWidth="xl">
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase', // Adds emphasis to the title
            letterSpacing: '2px', // Adds spacing between letters
          }}
        >
          Meet Our Team
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#aaa', // Softer color for the description
            fontSize: '20px',
            maxWidth: '600px', // Limit width for better readability
            margin: '0 auto', // Center text block
            lineHeight: '1.6', // Improve line spacing
            paddingBottom: '4vh', // Adds spacing after description
          }}
        >
          We’re a group of passionate individuals committed to the cause of
          empowerment and inclusivity. Meet the people behind the mission.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.name}>
            <TeamMemberCard
              name={member.name}
              position={member.position}
              imageUrl={member.imageUrl}
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)', // Slight lift on hover
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Subtle shadow
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default ReachOurTeam;
