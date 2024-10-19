// MapComponent.js
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fixing the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ latitude, longitude, diseaseData }) => {
  const position = [latitude, longitude]; 

  // Define colors for diseases
  const diseaseColors = {
    HIV: "red",
    Gonorrhea: "orange",
    STD: "blue",
    TB: "green",
  };

  return (
    <MapContainer
      center={position}
      zoom={6} // Adjusted zoom level for better visibility
      style={{ height: "500px", width: "100%" }}
    >
      {/* Tile Layer from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* Marker at the given position */}
      <Marker position={position}>
        <Popup>
          Location: {latitude}, {longitude}
        </Popup>
      </Marker>
      {/* Disease markers */}
      {diseaseData.map((item, index) => (
        <CircleMarker
          key={index}
          center={[item.lat, item.lon]}
          radius={5}
          color={diseaseColors[item.disease] || "black"}
          fillColor={diseaseColors[item.disease] || "black"}
          fillOpacity={0.5}
        >
          <Popup>
            <strong>{item.disease}</strong>
            <br />
            Cases: {item.cases}
            <br />
            Geography: {item.Geography}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
