import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSelectorProps {
  setLocation: (location: LatLng) => void;
}

const LocationMarker = ({ setLocation }: MapSelectorProps) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={L.icon({ iconUrl: '/assets/icons/marker-icon.svg', iconSize: [25, 41], iconAnchor: [12, 41] })}>
    </Marker>
  );
};

const MapSelector = ({ setLocation }: MapSelectorProps) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "400px", width: "150%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker setLocation={setLocation} />
    </MapContainer>
  );
};

export default MapSelector;