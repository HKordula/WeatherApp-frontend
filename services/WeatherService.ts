import axios from "axios";

// Interfaces for the weather data
interface Forecast {
  date: string; // Date of the forecast
  weatherCode: number; // Weather condition code
  minTemperature: number; // Minimum temperature for the day
  maxTemperature: number; // Maximum temperature for the day
  estimatedEnergy: number; // Estimated solar energy (kWh)
}

interface Summary {
  minTemperature: number; // Minimum temperature for the week
  maxTemperature: number; // Maximum temperature for the week
  avgPressure: number; // Average atmospheric pressure for the week (hPa)
  avgSunExposure: number; // Average sun exposure for the week (hours)
  comment: string; // Summary or comment about the week's weather
}

// Function to fetch the 7-day weather forecast
export const getWeatherForecast = async (latitude: number, longitude: number): Promise<Forecast[]> => {
  try {
    // Make a GET request to backend API
    const response = await axios.get(
      `https://weatherapp-backend-adhy.onrender.com/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`
    );

    // Map the API response to the `Forecast` interface
    return response.data.map((day: any) => ({
      date: day.date, // Date of the forecast
      weatherCode: day.weatherCode, // Weather condition code
      minTemperature: day.minTemperature, // Minimum temperature for the day
      maxTemperature: day.maxTemperature, // Maximum temperature for the day
      estimatedEnergy: day.estimatedEnergy, // Estimated solar energy production
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

// Function to fetch the weekly weather summary
export const getWeatherSummary = async (latitude: number, longitude: number): Promise<Summary> => {
  try {
    // Make a GET request to backend API
    const response = await axios.get(
      `https://weatherapp-backend-adhy.onrender.com/api/weather/summary?latitude=${latitude}&longitude=${longitude}`
    );

    // Extract and return the summary data from the API response
    const data = response.data;
    return {
      minTemperature: data.minTemperature, // Minimum temperature for the week
      maxTemperature: data.maxTemperature, // Maximum temperature for the week
      avgPressure: data.averagePressure, // Average atmospheric pressure
      avgSunExposure: data.averageSunExposure, // Average sun exposure in hours
      comment: data.weekSummary, // Summary or comment about the week's weather
    };
  } catch (error) {
    console.error('Error fetching weather summary:', error);
    throw error;
  }
};