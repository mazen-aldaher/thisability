import React, { createContext, useContext, useState } from 'react';

// Create ErrorsContext
export const ErrorsContext = createContext();

// Provider component
export const ErrorsProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

  // Function to set an error for a specific field
  const setError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  // Function to clear a specific error
  const clearError = (field) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };

  // Function to clear all errors
  const clearAllErrors = () => {
    setErrors({});
  };

  return (
    <ErrorsContext.Provider value={{ errors, setError, clearError, clearAllErrors }}>
      {children}
    </ErrorsContext.Provider>
  );
};

// Custom hook to use ErrorsContext
export const useErrors = () => {
  const context = useContext(ErrorsContext);
  if (!context) {
    throw new Error('useErrors must be used within an ErrorsProvider');
  }
  return context;
};
