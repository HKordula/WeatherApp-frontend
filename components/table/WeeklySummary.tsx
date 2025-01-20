"use client";

// Import React and required hooks
import React, { useEffect, useState } from "react";
import { getWeatherSummary } from "@/services/WeatherService";
import { LatLng } from "leaflet";

// Interface defining the structure of the summary data
interface Summary {
  minTemperature: number;
  maxTemperature: number;
  avgPressure: number;
  avgSunExposure: number;
  comment: string; 
}

interface WeeklySummaryProps {
  location: LatLng | null; // Location coordinates passed from parent
}

// WeeklySummary component
const WeeklySummary = ({ location }: WeeklySummaryProps) => {
  const [summary, setSummary] = useState<Summary | null>(null); // State to store the weather summary

  // Fetch weather summary data when location changes
  useEffect(() => {
    if (!location) return; // Exit if no location is provided

    const fetchSummary = async (latitude: number, longitude: number) => {
      try {
        // Fetch summary data using the service
        const data = await getWeatherSummary(latitude, longitude);
        setSummary(data); // Update state with the fetched summary
      } catch (error) {
        console.error("Error fetching weather summary:", error); // Log any errors
      }
    };

    fetchSummary(location.lat, location.lng); // Call the fetch function with location coordinates
  }, [location]);

  // Render loading message if summary data is not yet available
  if (!summary) {
    return <div>Loading summary...</div>;
  }

  return (
    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-md">
      {/* Display minimum temperature */}
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Min Temperature:</strong> {summary.minTemperature}°C
      </p>

      {/* Display maximum temperature */}
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Max Temperature:</strong> {summary.maxTemperature}°C
      </p>

      {/* Display average pressure */}
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Average Pressure:</strong> {summary.avgPressure} hPa
      </p>

      {/* Display average sun exposure */}
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Average Sun Exposure:</strong> {summary.avgSunExposure} hours
      </p>

      {/* Display additional comments */}
      <p className="text-neutral-600 dark:text-neutral-400">
        <strong>Comment:</strong> {summary.comment}
      </p>
    </div>
  );
};

export default WeeklySummary;
