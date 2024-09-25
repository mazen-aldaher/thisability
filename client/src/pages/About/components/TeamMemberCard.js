import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const TeamMemberCard = ({ name, position, imageUrl }) => (
  <Card
    sx={{
      alignItems: "center",
      p: 2,
      m: 1,
      maxWidth: 300,
      backgroundColor: "transparent",
      border: "1px solid orange",
    }}
  >
    <Avatar src={imageUrl} alt={name} sx={{ width: 250, height: 250, mr: 2 }} />
    <Container>
      <CardContent textAlign="center">
        <Typography variant="h6" component="div" textAlign="center">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {position}
        </Typography>
      </CardContent>
    </Container>
  </Card>
);

export default TeamMemberCard;
