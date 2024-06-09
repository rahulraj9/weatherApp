// src/components/LocationSearch.js

import React, { useState } from 'react';
import './LocationSearch.css';

const LocationSearch = ({ onLocationSearch }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location.trim()) {
      onLocationSearch({ city: location.trim() });
    } else {
      alert('Please enter a valid city name.');
    }
  };

  return (
    <div className="LocationSearch">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default LocationSearch;
