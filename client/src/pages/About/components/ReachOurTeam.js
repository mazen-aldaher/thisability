import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import TeamMemberCard from "./TeamMemberCard"; // Import the TeamMemberCard component

const ReachOurTeam = ({ teamMembers }) => (
  <Box
    sx={{ backgroundColor: "#666", paddingTop: "2vh", paddingBottom: "10vh" }}
  >
    <Container maxWidth="lg">
      <Box>
        <Typography
          variant="h2"
          gutterBottom
          textAlign={"center"}
          sx={{ color: "#fff" }}
        >
          Reach Our Team
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "#fff", fontSize: "21px", paddingBottom: "6vh" }}
          textAlign={"center"}
        >
          We’re a group of passionate individuals committed to the cause of
          empowerment and inclusivity.
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <TeamMemberCard
              name={member.name}
              position={member.position}
              imageUrl={member.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default ReachOurTeam;
