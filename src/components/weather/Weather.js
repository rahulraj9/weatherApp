// src/components/Weather.js

import React from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import "./Weather.css";

const Weather = ({ data }) => {

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return <WiThunderstorm />;
    if (weatherId >= 300 && weatherId < 500) return <WiRain />;
    if (weatherId >= 500 && weatherId < 600) return <WiRain />;
    if (weatherId >= 600 && weatherId < 700) return <WiSnow />;
    if (weatherId >= 700 && weatherId < 800) return <WiFog />;
    if (weatherId === 800) return <WiDaySunny />;
    if (weatherId > 800) return <WiCloud />;
    return null;
  };

  const weatherIcon = getWeatherIcon(data.weather[0].id);

  return (
     <div className="Weather">
      <h2>Weather in {data.name}</h2>
      <div className="Weather-info">
        <div className="Weather-main">
          {weatherIcon && <div className="Weather-icon">{weatherIcon}</div>}
          <p>Temperature: {data.main.temp}°C</p>
          <p>Condition: {data.weather[0].description}</p>
        </div>
        <div className="Weather-details">
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
