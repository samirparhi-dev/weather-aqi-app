// src/WeatherAQI.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherAQI = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [aqi, setAQI] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      fetchWeather(latitude, longitude);
      fetchAQI(latitude, longitude);
    });
  }, []);

  const fetchWeather = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    setWeather(response.data);
  };

  const fetchAQI = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_AQI_API_KEY;
    const response = await axios.get(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${apiKey}`
    );
    setAQI(response.data.data);
  };

  if (!location) return <div>Loading location...</div>;

  return (
    <div>
      <h1>Weather and AQI Data</h1>
      {weather && (
        <div>
          <h2>Weather</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {aqi && (
        <div>
          <h2>AQI</h2>
          <p>AQI: {aqi.aqi}</p>
          <p>Dominant Pollutant: {aqi.dominentpol}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherAQI;
