// import dependances from react
//Create context
//Provide a hook for easy to use
//create Provider which will be component parent

import React, { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item = null, editMode = false, createMode = false) => {
    setSelectedItem(item);
    setIsEditMode(editMode);
    setIsCreateMode(createMode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditMode(false);
    setIsCreateMode(false);
    setIsModalOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        selectedItem,
        isEditMode,
        setIsEditMode,
        isCreateMode,
        setIsCreateMode,
        openModal,
        closeModal,

      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
