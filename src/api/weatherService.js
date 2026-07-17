import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  if (!API_KEY) {
    throw new Error("API key is missing. Please add VITE_WEATHER_API_KEY to your .env file.");
  }
  
  try {
    // Current Weather
    const currentRes = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });

    // 5-Day Forecast (Includes data every 3 hours)
    const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });

    return {
      current: currentRes.data,
      forecast: forecastRes.data
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("City not found. Please try another search.");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch weather data.");
  }
};
