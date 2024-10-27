import React, { createContext, useContext, useState } from 'react';

// Create the LoadingContext
const LoadingContext = createContext();

// Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Show loading spinner
  const startLoading = () => setLoading(true);

  // Hide loading spinner
  const stopLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use LoadingContext
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
