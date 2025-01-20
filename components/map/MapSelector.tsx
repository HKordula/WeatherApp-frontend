"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L, { LatLng, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapSelectorProps {
  location: LatLng | null;
  setLocation: (location: LatLng) => void; 
}

// Define map bounds
const BOUNDS: LatLngBounds = new L.LatLngBounds(
  [-85.05112878, -180], // Southwest corner
  [85.05112878, 180] // Northeast corner
);

// Component to display a marker at the selected position
const LocationMarker = ({ position }: { position: LatLng | null }) => {
  return position ? (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "/assets/icons/marker-icon.svg", // Custom marker icon
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point
      })}
    />
  ) : null;
};

// Component to handle map click events and update position
const MapClickHandler = ({
  setPosition,
  setLocation,
}: {
  setPosition: (pos: LatLng) => void;
  setLocation: (pos: LatLng) => void;
}) => {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      setPosition(e.latlng); // Update local position state
      setLocation(e.latlng); // Notify the parent component
    },
  });
  return null;
};

// Component to synchronize the map view with the location
const MapAutoSync = ({ location }: { location: LatLng | null }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      const currentZoom = map.getZoom();
      const newZoom = Math.min(currentZoom + 5, map.getMaxZoom()); // Increase zoom
      map.flyTo(location, newZoom); // Smoothly move the map
    }
  }, [location, map]);

  return null;
};

// Main MapSelector component
const MapSelector = ({ location, setLocation }: MapSelectorProps) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useEffect(() => {
    if (location) {
      setPosition(location); // Update local position when location prop changes
    }
  }, [location]);

  // Automatically get the user's current location based on browser geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = new L.LatLng(pos.coords.latitude, pos.coords.longitude);
          setPosition(userLocation); // Set user's location locally
          setLocation(userLocation); // Notify the parent component
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, [setLocation]);

  return (
    <div className="relative w-full max-w-[800px] mx-auto aspect-video overflow-hidden rounded-lg">
      {/* Map container */}
      <MapContainer
        center={[0, 0]}
        zoom={2} // Default zoom level
        minZoom={2} // Minimum zoom level
        maxZoom={18} // Maximum zoom level
        style={{ height: "100%", width: "100%" }}
        maxBounds={BOUNDS} // Restrict the map to world bounds
        maxBoundsViscosity={1.0} // Prevent panning outside bounds
        scrollWheelZoom={true} // Enable zoom with mouse scroll
      >
        {/* Tile layer for the map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tile URL
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors' // Attribution for map data
          noWrap={true} // Prevent map wrapping horizontally
        />
        {/* Display the marker */}
        <LocationMarker position={position} />
        {/* Handle map click events */}
        <MapClickHandler setPosition={setPosition} setLocation={setLocation} />
        {/* Synchronize map view with location prop */}
        <MapAutoSync location={location} />
      </MapContainer>
    </div>
  );
};

export default MapSelector;
