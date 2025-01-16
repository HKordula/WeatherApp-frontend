import axios from "axios";

interface Forecast {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  estimatedEnergy: number;
}

interface Summary {
  minTemperature: number;
  maxTemperature: number;
  avgPressure: number;
  avgSunExposure: number;
  comment: string;
}

export const getWeatherForecast = async (latitude: number, longitude: number): Promise<Forecast[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`);
    return response.data.map((day: any) => ({
      date: day.date,
      weatherCode: day.weatherCode,
      minTemperature: day.minTemperature,
      maxTemperature: day.maxTemperature,
      estimatedEnergy: day.estimatedEnergy,
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

export const getWeatherSummary = async (latitude: number, longitude: number): Promise<Summary> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/weather/summary?latitude=${latitude}&longitude=${longitude}`);
    const data = response.data;
    return {
      minTemperature: data.minTemperature,
      maxTemperature: data.maxTemperature,
      avgPressure: data.averagePressure,
      avgSunExposure: data.averageSunExposure,
      comment: data.weekSummary,
    };
  } catch (error) {
    console.error('Error fetching weather summary:', error);
    throw error;
  }
};