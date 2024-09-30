import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";

const TeamMemberCard = ({ name, position, imageUrl }) => (
  <Card
    sx={{
      maxWidth: 300,
      p: 3,
      m: 1,
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
      borderRadius: "16px", // Rounded corners
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      border: "1px solid orange", // Accent border
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-10px)", // Lift effect on hover
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
      },
    }}
  >
    <Avatar
      src={imageUrl}
      alt={name}
      sx={{
        width: 180, // Slightly smaller avatar size
        height: 180,
        mx: "auto", // Center the avatar
        mb: 2, // Margin below the avatar
      }}
    />
    <CardContent>
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#fff" }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: "#ffcc80", fontStyle: "italic" }}>
        {position}
      </Typography>
    </CardContent>
  </Card>
);

export default TeamMemberCard;
