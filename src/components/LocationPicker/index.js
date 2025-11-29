import * as React from 'react';
import { func, shape, number } from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
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

export default function LocationPicker({ value, onChange }) {
  const center = value?.lat && value?.lng ? value : DEFAULT_CENTER;

  const handleClick = event => {
    onChange({ lat: event.latlng.lat, lng: event.latlng.lng });
  };

  return (
    <Map
      center={center}
      zoom={value?.lat ? 15 : 11}
      style={{ height: '300px', width: '100%' }}
      onClick={handleClick}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {value?.lat && value?.lng ? <Marker position={value} /> : null}
    </Map>
  );
}

LocationPicker.propTypes = {
  /** koordinat marker terpilih */
  value: shape({ lat: number, lng: number }),
  onChange: func,
};

LocationPicker.defaultProps = {
  onChange: () => null,
};
