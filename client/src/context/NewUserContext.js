import React, { createContext, useContext, useState } from 'react';

// Create NewUserContext
export const NewUserContext = createContext();

// Provider component
export const NewUserProvider = ({ children }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'admin',
    password: '',
  });

  // Function to update a specific field in newUser
  const updateNewUser = (field, value) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Function to reset the newUser fields
  const resetNewUser = () => {
    setNewUser({
      username: '',
      email: '',
      role: 'admin',
      password: '',
    });
  };

  return (
    <NewUserContext.Provider value={{ newUser, updateNewUser, resetNewUser }}>
      {children}
    </NewUserContext.Provider>
  );
};

// Custom hook to use NewUserContext
export const useNewUser = () => {
  const context = useContext(NewUserContext);
  if (!context) {
    throw new Error('useNewUser must be used within a NewUserProvider');
  }
  return context;
};
