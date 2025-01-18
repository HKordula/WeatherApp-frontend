"use client";
import React, { useEffect, useState } from "react";
import { getWeatherSummary } from "@/services/WeatherService";
import { LatLng } from "leaflet";

interface Summary {
  minTemperature: number;
  maxTemperature: number;
  avgPressure: number;
  avgSunExposure: number;
  comment: string;
}

interface WeeklySummaryProps {
  location: LatLng | null;
}

const WeeklySummary = ({ location }: WeeklySummaryProps) => {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchSummary = async (latitude: number, longitude: number) => {
      try {
        const data = await getWeatherSummary(latitude, longitude);
        setSummary(data);
      } catch (error) {
        console.error("Error fetching weather summary:", error);
      }
    };

    fetchSummary(location.lat, location.lng);
  }, [location]);

  if (!summary) {
    return <div>Loading summary...</div>;
  }

  return (
    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-md">
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Min Temperature:</strong> {summary.minTemperature}°C
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Max Temperature:</strong> {summary.maxTemperature}°C
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Average Pressure:</strong> {summary.avgPressure} hPa
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Average Sun Exposure:</strong> {summary.avgSunExposure} hours
      </p>
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Comment:</strong> {summary.comment}
      </p>
    </div>
  );
};

export default WeeklySummary;