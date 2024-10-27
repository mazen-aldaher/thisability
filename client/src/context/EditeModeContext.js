import React, { createContext, useContext, useState } from 'react';

// Create the EditModeContext
const EditModeContext = createContext();

// Provider component
export const EditModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // Toggle edit mode state
  const toggleEditMode = () => setIsEditMode((prevMode) => !prevMode);

  // Enable edit mode
  const enableEditMode = () => setIsEditMode(true);

  // Disable edit mode
  const disableEditMode = () => setIsEditMode(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, enableEditMode, disableEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

// Custom hook to use EditModeContext
export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
