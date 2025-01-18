"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MapSelector from "@/components/map/MapSelector";
import { LatLng } from "leaflet";
import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import ForecastTable from "@/components/table/ForecastTable";
import WeeklySummary from "@/components/table/WeeklySummary";

export default function Home() {
  const [location, setLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(new LatLng(latitude, longitude));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-800 shadow-md">
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/icons/logo.svg"
            alt="App Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200">
            WeatherApp
          </h1>
        </div>
        <div className="relative flex items-center space-x-2 max-w-md w-full">
          <Input
            type="search"
            placeholder="Search by city or coordinates (e.g., 51.5, -0.1)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-neutral-800 focus:outline-none"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
        <ModeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4">
        {/* Forecast Table */}
        <div className="mt-8 mb-8">
          <ForecastTable location={location} />
        </div>

        {/* Summary and Map Section */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8 mb-20">
          {/* Summary Section */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-200 mb-4">
              Weekly Summary
            </h2>
            <WeeklySummary location={location} />
          </div>

          {/* Map Section */}
          <div className="lg:w-2/3">
            <MapSelector setLocation={setLocation} />
          </div>
        </div>
      </main>
    </div>
  );
}
