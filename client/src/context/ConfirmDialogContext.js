import React, { createContext, useContext, useState } from 'react';

// Create ConfirmDialogContext
export const ConfirmDialogContext = createContext();

// Provider component
export const ConfirmDialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: null,
    visible: false,
  });

  // Function to show the confirmation dialog
  const showConfirmDialog = (message, onConfirm) => {
    setDialog({ message, onConfirm, visible: true });
  };

  // Function to handle confirmation
  const handleConfirm = () => {
    if (dialog.onConfirm) {
      dialog.onConfirm();
    }
    clearDialog();
  };

  // Function to handle cancellation
  const handleCancel = () => {
    clearDialog();
  };

  // Function to clear the dialog state
  const clearDialog = () => {
    setDialog({ message: '', onConfirm: null, visible: false });
  };

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
      {children}
      {dialog.visible && (
        <div className="confirm-dialog">
          <p>{dialog.message}</p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
};

// Custom hook to use ConfirmDialogContext
export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
};
