import * as React from 'react';
import { func, shape, number } from 'prop-types';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER = { lat: -6.2088, lng: 106.8456 };

// MapContainer (react-leaflet v3+) hanya memakai center/zoom saat render awal;
// perlu digerakkan manual saat props berubah setelah mount (beda dari Map v2).
function RecenterOnChange({ center, zoom }) {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

function ClickHandler({ onClick }) {
  useMapEvents({
    click: onClick,
  });

  return null;
}

export default function LocationPicker({ value, onChange = () => null }) {
  const center = value?.lat && value?.lng ? value : DEFAULT_CENTER;
  const zoom = value?.lat ? 15 : 11;

  const handleClick = event => {
    onChange({ lat: event.latlng.lat, lng: event.latlng.lng });
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '300px', width: '100%' }}>
      <RecenterOnChange center={center} zoom={zoom} />
      <ClickHandler onClick={handleClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {value?.lat && value?.lng ? <Marker position={value} /> : null}
    </MapContainer>
  );
}

LocationPicker.propTypes = {
  /** koordinat marker terpilih */
  value: shape({ lat: number, lng: number }),
  onChange: func,
};
