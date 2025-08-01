import React from 'react';
import { useSearch } from '../contexts/SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="search-bar">
        <input 
          type="text" 
          name="search"
          className="search-bar__input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-bar__button">
          <svg className="search-bar__button-icon">
            <use href="#icon-search" />
          </svg>
        </button>
    </div>
  );
};

export default SearchBar; 