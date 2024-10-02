import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/api/users/profile",
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
            setIsOnboardingComplete(data.isOnboardingComplete);
          } else {
            setIsOnboardingComplete(true); // Skip onboarding for non-artists
          }
        } catch (error) {
          console.error("Error fetching user", error);
          localStorage.removeItem("token");
          setUser(null);
          setUserRole(null);
          setIsOnboardingComplete(false);
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      setUser(data);
      setUserRole(data.role);
      setIsOnboardingComplete(data.isOnboardingComplete);
    } catch (error) {
      console.error("Error logging in", error);
      // Optional: You may want to throw an error or return a specific message
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
    setIsOnboardingComplete(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isOnboardingComplete,
        setIsOnboardingComplete,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
