import React from 'react'

const validateForm = () => {
    if (!email || !password) {
      showNotification('Both email and password are required.', 'error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return false;
    }
    return true;
  };

export default ValidateForm