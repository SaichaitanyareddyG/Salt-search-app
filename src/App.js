// App.js

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SaltCard from './components/SaltCard';
import './components/Card.css'

const App = () => {
  const [salts, setSalts] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`);
      const data = await response.json();
      setSalts(data.data.saltSuggestions);
    } catch (error) {
      console.error('Error fetching salts:', error);
      setSalts([])
    }
  };

  return (
    <div className="app">
      <header>
        <h1 style={{textAlign: 'center',marginBottom:'63px', marginTop:'25px'}}>Cappsule Web Development Test</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <hr></hr>
      <div className="salt-list">
        {salts.length>0 ? salts.map((salt) => (
          <SaltCard key={salt.id} salt={salt}  />
        )): 
        <h2>“ Find medicines with amazing discount “</h2>
        }
      </div>
    </div>
  );
};

export default App;
