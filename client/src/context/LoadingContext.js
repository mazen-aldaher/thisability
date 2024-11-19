import React, { createContext, useContext, useState } from 'react';

// Create the LoadingContext
const LoadingContext = createContext();

// Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  /**
   * Start loading by setting the `loading` state to true.
   */
  const startLoading = () => {
    if (!loading) setLoading(true);
  };

  /**
   * Stop loading by setting the `loading` state to false.
   */
  const stopLoading = () => {
    if (loading) setLoading(false);
  };

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
