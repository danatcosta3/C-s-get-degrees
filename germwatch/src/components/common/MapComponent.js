import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fixing the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ latitude, longitude }) => {
  const position = [latitude, longitude]; // Set the position based on props

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "500px", width: "35%" }}
    >
      {/* Tile Layer from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Marker at the given position */}
      <Marker position={position}>
        <Popup>
          Location: {latitude}, {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
