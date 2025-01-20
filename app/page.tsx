"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import ForecastTable from "@/components/table/ForecastTable";
import WeeklySummary from "@/components/table/WeeklySummary";
import { LatLng } from "leaflet";
import L from "leaflet";


// Dynamically import MapSelector.
const MapSelector = dynamic(() => import("@/components/map/MapSelector"), { ssr: false });

export default function Home() {
  const [location, setLocation] = useState<LatLng | null>(null); // State to store location coordinates
  const [cityName, setCityName] = useState<string>("your location"); // State to store the name of the city
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to store the search query for city or coordinates

  // Function to fetch city name from coordinates using OpenStreetMap API
  const fetchCityName = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      // Set city name
      if (data && data.address) {
        setCityName(data.address.city || data.address.town || data.address.village || "your location");
      } else {
        setCityName("your location");
      }
    } catch (error) {
      console.error("Failed to fetch city name:", error);
      setCityName("your location");
    }
  };

  // Function to fetch coordinates from a city name using OpenStreetMap API
  const fetchCoordinates = async (city: string) => {
    if (!city.trim()) {
      return; // Skip if the city name is empty
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      const data = await response.json();

      // If coordinates found, update location and fetch city name
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = new L.LatLng(parseFloat(lat), parseFloat(lon));
        setLocation(newLocation);

        fetchCityName(newLocation.lat, newLocation.lng);
      }
    } catch (error) {
      console.error("Failed to fetch coordinates:", error);
    }
  };

  // UseEffect hook to fetch user's current location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = new L.LatLng(latitude, longitude);
          setLocation(newLocation);

          fetchCityName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  // UseEffect hook to update city name whenever location changes
  useEffect(() => {
    if (location) {
      fetchCityName(location.lat, location.lng);
    }
  }, [location]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header section */}
      <header className="flex flex-wrap items-center px-6 py-4 bg-neutral-100 dark:bg-neutral-800 shadow-md">
        <div className="flex items-center space-x-4">
          {/* App logo */}
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
        {/* Mode toggle */}
        <div className="ml-auto order-2 sm:order-3 sm:ml-0">
          <ModeToggle />
        </div>
        {/* Search input and button */}
        <div className="flex flex-grow items-center justify-center w-full sm:w-auto mt-4 sm:mt-0 order-3 sm:order-2 sm:ml-auto space-x-2">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city or coordinates (e.g., 51.5, -0.1)"
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-neutral-800 focus:outline-none w-full sm:w-96"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={() => fetchCoordinates(searchQuery)}
          >
            Search
          </button>
        </div>
      </header>

      {/* Main content section */}
      <main className="flex-grow container mx-auto px-4 remove-scrollbar">
        <div className="text-center my-6">
          {/* Display city name */}
          <h2 className="text-3xl font-bold text-neutral-700 dark:text-neutral-200">
            Weather in {cityName} this week
          </h2>
        </div>
        <div className="mt-8 mb-8">
          {/* Forecast table component */}
          <ForecastTable location={location} />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mb-10">
          {/* Weekly summary */}
          <div className="lg:col-span-1 p-4">
            <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-200 mb-4">
              Weekly Summary
            </h2>
            <WeeklySummary location={location} />
          </div>
          {/* Map selector */}
          <div className="lg:col-span-2">
            <MapSelector location={location} setLocation={setLocation} />
          </div>
        </div>
      </main>
    </div>
  );
}
