import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeather } from './api/weatherService';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <SearchBar onSearch={handleSearch} />
      
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger glass-panel-dark text-danger border-danger mt-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      {!loading && !error && weatherData && (
        <WeatherDisplay weatherData={weatherData} />
      )}

      {!loading && !error && !weatherData && (
        <div className="text-center mt-5 glass-panel opacity-75">
          <i className="bi bi-cloud-arrow-up display-1 mb-3"></i>
          <h4>Search for a city to see the weather</h4>
        </div>
      )}
    </div>
  );
}

export default App;
