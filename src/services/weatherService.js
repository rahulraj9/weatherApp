import axios from 'axios';

const API_KEY = 'c2267cc0777a49f2939f2272d2c2aa6d'; // Replace with your weather API key

export const getWeather = async (location) => {
  try {
    let url = '';
    if (location.latitude && location.longitude) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`;
    } else if (location.city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location.city}&units=metric&appid=${API_KEY}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data.');
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};