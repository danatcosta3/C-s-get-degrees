import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";
function MapPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>This is the Map Page</h1>
      <MapComponent /> {/* Render the MapComponent here */}
    </div>
  );
}

export default MapPage;
