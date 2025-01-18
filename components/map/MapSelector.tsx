import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L, { LatLng, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapSelectorProps {
  setLocation: (location: LatLng) => void;
}

// Define map bounds (entire world)
const BOUNDS: LatLngBounds = new L.LatLngBounds(
  [-85.05112878, -180], // Southwest corner
  [85.05112878, 180] // Northeast corner
);

const LocationMarker = ({ position }: { position: LatLng | null }) => {
  return position ? (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "/assets/icons/marker-icon.svg",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })}
    />
  ) : null;
};

const MapClickHandler = ({
  setPosition,
  setLocation,
}: {
  setPosition: (pos: LatLng) => void;
  setLocation: (pos: LatLng) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng); // Update position state
      setLocation(e.latlng); // Notify parent component
    },
  });
  return null;
};

const MapAutoZoom = ({ position }: { position: LatLng | null }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13); // Automatically zoom to position with level 13
    }
  }, [map, position]);

  return null;
};

const MapSelector = ({ setLocation }: MapSelectorProps) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = new LatLng(pos.coords.latitude, pos.coords.longitude);
          setPosition(userLocation); // Set the user's location
          setLocation(userLocation); // Pass the location to the parent component
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
    <div className="relative w-full max-w-[800px] mx-auto aspect-video overflow-hidden">
      <MapContainer
        center={[0, 0]} // Default center
        zoom={2} // Default zoom level for the full world view
        minZoom={2}
        maxZoom={18}
        style={{ height: "100%", width: "100%" }}
        maxBounds={BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors'
          noWrap={true}
        />
        <LocationMarker position={position} />
        <MapClickHandler setPosition={setPosition} setLocation={setLocation} />
        <MapAutoZoom position={position} />
      </MapContainer>
    </div>
  );
};

export default MapSelector;
