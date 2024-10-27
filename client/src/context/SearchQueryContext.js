import React, { createContext, useContext, useState } from 'react';

// Create SearchQueryContext
export const SearchQueryContext = createContext();

// Provider component
export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to update the search query
  const updateSearchQuery = (query) => setSearchQuery(query);

  return (
    <SearchQueryContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

// Custom hook to use SearchQueryContext
export const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);
  if (!context) {
    throw new Error('useSearchQuery must be used within a SearchQueryProvider');
  }
  return context;
};
