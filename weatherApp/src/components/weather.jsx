import React, { useState, useEffect } from 'react';
import './weather.css';

const Weather = () => {
  const [city, setCity] = useState('Lahore');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'e4256d23055a47a8877151603241108';

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city, apiKey]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setCity(city);
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Location: {weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {Math.round(weather.current.temp_c)}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
