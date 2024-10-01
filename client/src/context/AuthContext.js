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
      setOnboardingComplete(data.isOnboardingComplete);
    } catch (error) {
      console.error("Error logging in", error);
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
