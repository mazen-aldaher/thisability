import React from "react";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import Arrow from "@mui/icons-material/ArrowForward";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";

const PostCard = ({ postImg, date, comments, postTitle, category, onReadMore }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f5f5f5", // Lighter background for better readability
        padding: "20px",
        maxHeight: "60vh",
        width: "100%",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)", // Slightly scale up on hover
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Box
          component="img"
          src={postImg}
          sx={{
            width: "100%",
            minHeight: "150px",
            maxHeight: "30vh",
            objectFit: "cover", // Ensure image covers the box
          }}
        />
      </Box>
      
      {/* Card Content Section */}
      <CardContent sx={{ textAlign: "left" }}>
        {/* Date and Comments */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" color="gray">
            <EventIcon fontSize="small" />
            <Typography variant="body2" color={theme.palette.secondary.main} ml={0.5}>
              {date}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" color="gray">
            <CommentIcon fontSize="small" />
            <Typography variant="body2" color={theme.palette.secondary.main} ml={0.5}>
              Comments ({comments})
            </Typography>
          </Box>
        </Stack>

        {/* Post Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.primary.main}
          sx={{ mb: 2 }}
        >
          {postTitle}
        </Typography>

        {/* Category Label */}
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          sx={{ mb: 2 }}
        >
          Category: {category}
        </Typography>

        {/* Read More Button */}
        <IconButton
          variant="contained"
          onClick={onReadMore}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: "#98d48c",
            },
          }}
        >
          <Typography variant="body2" sx={{ mr: 1 }}>Read More</Typography>
          <Arrow />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PostCard;
