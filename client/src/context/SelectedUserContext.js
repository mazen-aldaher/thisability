import React, { createContext, useContext, useState } from 'react';

// Create the SelectedUserContext
const SelectedUserContext = createContext();

// Provider component
export const SelectedUserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Select a user
  const selectUser = (user) => {
    setSelectedUser(user);
  };

  // Deselect the user
  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <SelectedUserContext.Provider value={{ selectedUser, selectUser, clearSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

// Custom hook for using the SelectedUserContext
export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error('useSelectedUser must be used within a SelectedUserProvider');
  }
  return context;
};
