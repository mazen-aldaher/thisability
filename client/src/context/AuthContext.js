import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
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
          setUserRole(data.role);

          // Check if the role is "artist" and set onboarding status accordingly
          if (data.role === "artist") {
            setOnboardingComplete(data.isOnboardingComplete);
          } else {
            setOnboardingComplete(true); // Skip onboarding for non-artists
          }
        } catch (error) {
          console.error("Error fetching user", error);
          localStorage.removeItem("token");
          setUser(null);
          setUserRole(null);
          setOnboardingComplete(false);
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );

      // Assuming the token is returned in response.data
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      setUserRole(response.data.role);
      setOnboardingComplete(response.data.isOnboardingComplete);

      return response; // Return the response object
    } catch (error) {
      console.error("Error logging in", error);
      throw error; // Re-throw the error for handling in the component
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          username,
          email,
          password,
        }
      );

      // Assuming the token is returned in response.data
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      setUserRole(response.data.role);
      setOnboardingComplete(response.data.isOnboardingComplete);

      return response; // Return the response object
    } catch (error) {
      console.error("Error registering", error);
      throw error; // Re-throw the error for handling in the component
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
    setOnboardingComplete(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isOnboardingComplete,
        setOnboardingComplete,
        login,
        register, // Add the register function to context
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
