import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";
import axios from "axios";

const MapPage = () => {
  const [searchParams] = useSearchParams(); // Get the search parameters from the URL
  const city = searchParams.get("city"); // Retrieve the city parameter
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null }); // State to store coordinates
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    if (city) {
      // Function to fetch coordinates from the geocoding API
      const fetchCoordinates = async () => {
        setLoading(true); // Set loading to true when fetching starts
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              city
            )}&format=json&limit=1`
          );
          if (response.data.length > 0) {
            // Get the first result's lat and lon
            const { lat, lon } = response.data[0];
            setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
            setError(null); // Clear any previous errors
          } else {
            setError("City not found");
          }
        } catch (err) {
          setError("Error fetching coordinates");
        } finally {
          setLoading(false); // Set loading to false when fetching is done
        }
      };

      fetchCoordinates(); // Call the function to fetch coordinates
    }
  }, [city]); // Run effect when the city changes

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{city}</h1>
      {loading && <p>Loading map...</p>}{" "}
      {/* Show loading message while fetching */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if any */}
      {!loading && coordinates.lat && coordinates.lon && (
        <MapComponent latitude={coordinates.lat} longitude={coordinates.lon} /> // Pass coordinates to MapComponent
      )}
    </div>
  );
};

export default MapPage;
