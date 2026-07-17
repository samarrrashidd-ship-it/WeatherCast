import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="mb-0 fw-bold">
        <i className="bi bi-cloud-sun me-2 text-warning"></i>WeatherCast
      </h3>
      <form onSubmit={handleSubmit} className="d-flex" style={{ maxWidth: '400px', width: '100%' }}>
        <input
          type="text"
          className="form-control glass-input me-2"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-glass px-4">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
