import React, { createContext, useContext, useState } from 'react';

// Create ButtonLoadingContext
export const ButtonLoadingContext = createContext();

// Provider component
export const ButtonLoadingProvider = ({ children }) => {
  const [buttonLoading, setButtonLoading] = useState(false);

  // Show button loading state
  const startButtonLoading = () => setButtonLoading(true);

  // Hide button loading state
  const stopButtonLoading = () => setButtonLoading(false);

  return (
    <ButtonLoadingContext.Provider value={{ buttonLoading, startButtonLoading, stopButtonLoading }}>
      {children}
    </ButtonLoadingContext.Provider>
  );
};

// Custom hook to use ButtonLoadingContext
export const useButtonLoading = () => {
  const context = useContext(ButtonLoadingContext);
  if (!context) {
    throw new Error('useButtonLoading must be used within a ButtonLoadingProvider');
  }
  return context;
};
