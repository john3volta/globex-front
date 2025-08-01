import React from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <SearchProvider>
      <div className="app">
        <SearchBar />
        <UserList />
      </div>
    </SearchProvider>
  );
}

export default App; 