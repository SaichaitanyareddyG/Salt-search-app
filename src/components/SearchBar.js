// components/SearchBar.js

import React, { useState } from 'react';
import './Card.css'
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [temperoryStyle, setTemperoryStyle]=useState()

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    if(searchTerm ===""){
      setTemperoryStyle({
        
          borderStyle:'groove',
          borderColor:'aqua'
        
      })
      setTimeout(() => {
        setTemperoryStyle({})
      }, 500);
    }

  };

  return (
    <div className='search-container'>
    <div className='search'>
       <div className='left-part'>
      <i class={ searchTerm ===""?"bi bi-search": "bi bi-arrow-left"}  onClick={()=>{setSearchTerm('');onSearch('')}}></i>
      <input type="text" style={temperoryStyle} value={searchTerm} onChange={handleChange} placeholder="Type your medicine name here" />
      </div>
      <div className='right-part'>
      <button type="submit" style={{cursor:'pointer'}} onClick={handleSubmit}>Search</button> 
      </div>
    </div>
    </div>
  );
};

export default SearchBar;
