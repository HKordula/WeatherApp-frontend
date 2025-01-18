// filepath: /c:/Users/huber/vscode/WeatherApp-frontend/components/table/ForecastTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getWeatherForecast } from "@/services/WeatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faSmog,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { LatLng } from "leaflet";

const weatherIcons: { [key: number]: IconDefinition } = {
  0: faSun,
  1: faCloud,
  2: faCloud,
  3: faCloud,
  45: faSmog,
  48: faSmog,
  51: faCloudRain,
  53: faCloudRain,
  55: faCloudRain,
  56: faCloudRain,
  57: faCloudRain,
  61: faCloudShowersHeavy,
  63: faCloudShowersHeavy,
  65: faCloudShowersHeavy,
  66: faCloudShowersHeavy,
  67: faCloudShowersHeavy,
  71: faSnowflake,
  73: faSnowflake,
  75: faSnowflake,
  77: faSnowflake,
  80: faCloudShowersHeavy,
  81: faCloudShowersHeavy,
  82: faCloudShowersHeavy,
  85: faSnowflake,
  86: faSnowflake,
  95: faBolt,
  96: faBolt,
  99: faBolt,
};

interface Forecast {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  estimatedEnergy: number;
}

interface ForecastTableProps {
  location: LatLng | null;
}

const ForecastTable = ({ location }: ForecastTableProps) => {
  const [forecast, setForecast] = useState<Forecast[]>([]);

  useEffect(() => {
    if (!location) return;

    const fetchForecast = async (latitude: number, longitude: number) => {
      try {
        const data = await getWeatherForecast(latitude, longitude);
        setForecast(data);
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    };

    fetchForecast(location.lat, location.lng);
  }, [location]);

  if (forecast.length === 0) {
    return <div>Loading forecast...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-md w-40 h-48"
        >
          <div className="text-center font-medium text-neutral-700 dark:text-neutral-200">
            {new Date(day.date).toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
          <FontAwesomeIcon
            icon={weatherIcons[day.weatherCode]}
            size="2x"
            className="text-neutral-600 dark:text-neutral-300 my-2"
          />
          <div className="text-center text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            {day.maxTemperature}°C / {day.minTemperature}°C
          </div>
          <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            {day.estimatedEnergy} kWh
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastTable;