// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/weather/Weather';
import LocationSearch from './components/location/LocationSearch';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { getCurrentLocation, getWeather } from './services/weatherService';
import localforage from 'localforage';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored location
    localforage.getItem('lastLocation').then(storedLocation => {
      if (storedLocation) {
        fetchWeather(storedLocation);
      } else {
        requestLocationPermission();
      }
    });
  }, []);

  const requestLocationPermission = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const currentLocation = { latitude, longitude };
      fetchWeather(currentLocation);
    } catch (err) {
      setError('Location permission denied. Please provide your location.');
    }
  };

  const fetchWeather = async (location) => {
    try {
      setError(null); // Clear any previous error
      const weatherData = await getWeather(location);
      setWeather(weatherData);
      setLocation(location);
      localforage.setItem('lastLocation', location);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the location and try again.');
      setWeather(null); // Clear any previous weather data
    }
  };

  const handleLocationSearch = (location) => {
    fetchWeather(location);
  };
  return (
    <div className="App">
      <Header />
      <LocationSearch onLocationSearch={handleLocationSearch} />
      {error && <p className="error">{error}</p>}
      {weather && <Weather data={weather} />}
      <Footer />
    </div>
  );
};

export default App;
