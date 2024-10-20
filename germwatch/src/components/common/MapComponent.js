// MapComponent.js
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

  // Compute minCases and maxCases
  let minCases = 0;
  let maxCases = 1;

  const numericCases = diseaseData
    .map((item) => item.cases)
    .filter((c) => typeof c === "number");

  if (numericCases.length > 0) {
    minCases = Math.min(...numericCases);
    maxCases = Math.max(...numericCases);
  }

  const getColor = (cases) => {
    if (cases === "Data suppressed") {
      return "gray"; // Color for suppressed data
    }
    if (typeof cases !== "number") {
      return "black"; // Default color
    }
    let t = 0;
    if (maxCases !== minCases) {
      t = (cases - minCases) / (maxCases - minCases);
    }
    const green = Math.round(255 * (1 - t));
    const color = `rgb(255, ${green}, 0)`;
    return color;
  };

  const createIcon = (cases) => {
    const color = getColor(cases);
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 1px solid #000;"></div>`,
      iconSize: [12, 12],
      className: "",
    });
  };

  return (
    <MapContainer
      center={position}
      zoom={10} 
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
        <Marker
          key={index}
          position={[item.lat, item.lon]}
          icon={createIcon(item.cases)}
        >
          <Popup>
            <strong>{item.disease}</strong>
            <br />
            Cases: {item.cases}
            <br />
            Geography: {item.Geography}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
