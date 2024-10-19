import React from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";
const MapPage = () => {
  const [searchParams] = useSearchParams(); // Get the search parameters from the URL
  const inputValue = searchParams.get("city"); // Retrieve the city parameter

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>City Entered: {inputValue}</h1> {/* Display the input value */}
      <MapComponent /> {/* Render the MapComponent here */}
    </div>
  );
};

export default MapPage; // Export the component
