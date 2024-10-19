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

const MapComponent = ({ latitude, longitude, filters, diseaseData }) => {
  const position = [latitude, longitude]; // Set the position based on props

  // Define colors for diseases
  const diseaseColors = {
    HIV: "red",
    Gonorrhea: "orange",
    STD: "blue",
    TB: "green",
  };

  // Generate markers based on filters and diseaseData
  const markers = [];

  diseaseData.forEach((disease) => {
    if (filters[disease.name]) {
      // The filter for this disease is active
      disease.data.forEach((item) => {
        // Create a marker for each data point
        markers.push({
          position: [item.lat, item.lon],
          disease: disease.name,
          cases: item.cases,
          geography: item.Geography,
          color: diseaseColors[disease.name] || "black",
        });
      });
    }
  });

  return (
    <MapContainer
      center={position}
      zoom={6} // Adjusted zoom level for better visibility
      style={{ height: "500px", width: "100%" }}
    >
      {/* Tile Layer from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {/* Marker at the given position */}
      <Marker position={position}>
        <Popup>
          Location: {latitude}, {longitude}
        </Popup>
      </Marker>
      {/* Disease markers */}
      {markers.map((marker, index) => (
        <CircleMarker
          key={index}
          center={marker.position}
          radius={5}
          color={marker.color}
          fillColor={marker.color}
          fillOpacity={0.5}
        >
          <Popup>
            <strong>{marker.disease}</strong>
            <br />
            Cases: {marker.cases}
            <br />
            Geography: {marker.geography}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
