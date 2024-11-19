import React, { createContext, useContext, useState } from 'react';

// Create the SelectedUserContext
const SelectedUserContext = createContext(null);

// Provider component
export const SelectedUserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  /**
   * Set a user as selected.
   * @param {Object} user - The user object to select.
   */
  const selectUser = (user) => {
    if (user && typeof user === 'object') {
      setSelectedUser(user);
    } else {
      console.error('Invalid user object passed to selectUser. Expected an object.');
    }
  };

  /**
   * Clear the currently selected user.
   */
  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <SelectedUserContext.Provider value={{ selectedUser, selectUser, clearSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

/**
 * Custom hook for accessing the SelectedUser context.
 * @returns {{selectedUser: Object|null, selectUser: Function, clearSelectedUser: Function}}
 * @throws Will throw an error if used outside a SelectedUserProvider.
 */
export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error('useSelectedUser must be used within a SelectedUserProvider.');
  }
  return context;
};
