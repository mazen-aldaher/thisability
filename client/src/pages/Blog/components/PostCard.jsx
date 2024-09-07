/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from "react";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import Arrow from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const PostCard = ({postImg,date,comments,postTitle}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#000",
        padding: "20px",
        maxHeight:"60vh",
        width:"100%"
      }}
    >
      {" "}
      {/* Image Section */}
      <Box sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Box
          component="img"
          src={postImg}
          sx={{ width: "100%", minHeight:"20px",maxHeight:"30vh", transition: "transform 0.3s ease-in-out", // Smooth transition
    "&:hover": {
      transform: "scale(1.05)", // Scale up the card when hovered
    }, }}
        />
      </Box>
      {/* Card Content Section */}
      <CardContent sx={{ textAlign: "left" }}>
        {/* Date and Comments */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" color="gray">
            <EventIcon fontSize="small" /> |
            <Typography
              variant="body2"
              color={theme.palette.secondary.main}
              ml={0.5}
            >
              {date}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" color="gray">
            <CommentIcon fontSize="small" /> |
            <Typography
              variant="body2"
              color={theme.palette.secondary.main}
              ml={0.5}
            >
              Comments ({comments})
            </Typography>
          </Box>
        </Stack>

        {/* Post Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.secondary.main}
          sx={{ mb: 2, textAlign: "left" }}
        >
{postTitle}        </Typography>

        {/* Read More Button */}
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#98d48c",
            },
          }}
          endIcon={<Arrow />}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
