import React from 'react';


const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
        <input 
          type="text" 
          name="search"
          className="search-bar__input" 
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