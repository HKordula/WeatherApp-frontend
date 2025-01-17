"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import WeatherTable from "@/components/table/WeatherTable";
import Image from 'next/image';
import MapSelector from "@/components/map/MapSelector";
import { LatLng } from 'leaflet';
import { ModeToggle } from "@/components/ModeToggle";

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
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }, []);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="sun"
            className="mb-12 h-10 w-fit"
          />
          <ModeToggle />
          <MapSelector setLocation={setLocation} />
          <WeatherTable location={location} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 WeatherApp
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}