import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Link,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(data);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            // If the error is related to authentication, remove the token
            localStorage.removeItem("token");
            setError("Session expired. Please log in again.");
          } else {
            setError("Failed to fetch user profile. Please try again later.");
          }
          console.error("Error fetching user", err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No token found. Please log in.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 10%",
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10%",
        backgroundColor: "#f4f4f4",
      }}
    >
      {user ? (
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {user.profilePicture && (
            <Avatar
              src={user.profilePicture}
              alt="User Avatar"
              sx={{ width: 120, height: 120, margin: "0 auto 1rem" }}
            />
          )}
          <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
            {user.username}'s Profile
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Role: {user.role}</Typography>
          <Typography variant="body1">First Name: {user.firstName}</Typography>
          <Typography variant="body1">Last Name: {user.lastName}</Typography>
          <Typography variant="body1">
            Date of Birth:{" "}
            {user.dateOfBirth
              ? formatDate(user.dateOfBirth)
              : "N/A"}
          </Typography>
          <Typography variant="body1">
            Phone Number: {user.phoneNumber || "N/A"}
          </Typography>
          <Typography variant="body1">ID Number: {user.idNumber || "N/A"}</Typography>
          <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
            Bio: {user.bio || "No bio available."}
          </Typography>

          {user.address && (
            <Box sx={{ textAlign: "left", marginBottom: "1rem" }}>
              <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                Address:
              </Typography>
              <Typography variant="body2">{user.address.street}</Typography>
              <Typography variant="body2">
                {user.address.city}, {user.address.state}{" "}
                {user.address.postalCode}
              </Typography>
              <Typography variant="body2">{user.address.country}</Typography>
            </Box>
          )}

          <Grid
            container
            spacing={1}
            sx={{ textAlign: "left", marginBottom: "1rem" }}
          >
            {user.website && (
              <Grid item xs={12}>
                <Typography variant="h6">Website:</Typography>
                <Link href={user.website} target="_blank" rel="noopener">
                  {user.website}
                </Link>
              </Grid>
            )}
            {user.socialLinks &&
              typeof user.socialLinks === "object" &&
              Object.entries(user.socialLinks).map(
                ([key, value]) =>
                  value && (
                    <Grid item xs={12} sm={6} key={key}>
                      <Typography
                        variant="h6"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {key}:
                      </Typography>
                      <Link href={value} target="_blank" rel="noopener">
                        {value}
                      </Link>
                    </Grid>
                  )
              )}
          </Grid>

          <Typography variant="body1">
            Joined: {formatDate(user.createdAt)}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">No user profile found.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
