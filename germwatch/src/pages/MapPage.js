import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";
import axios from "axios";
import './MapPage.css';

const MapPage = () => {
  const [searchParams] = useSearchParams(); // Get the search parameters from the URL
  const city = searchParams.get("city"); // Retrieve the city parameter
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null }); // State to store coordinates
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [filters, setFilters] = useState({ sickness: false, disease: false, std: false }); // State for data filters

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

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  return (
    <div className="map-page">
      <h1 className="map-title">{city}</h1>
      <div className="map-and-filters">
        <div className="filter-panel">
          <h3>Data Filters</h3>
          <label style={{ color: 'blue' }}>
            <input
              type="checkbox"
              name="sickness"
              checked={filters.sickness}
              onChange={handleFilterChange}
            />
            <span className="filter-label">Sickness</span>
          </label>
          <label style={{ color: 'green' }}>
            <input
              type="checkbox"
              name="disease"
              checked={filters.disease}
              onChange={handleFilterChange}
            />
            <span className="filter-label">Disease</span>
          </label>
          <label style={{ color: 'red' }}>
            <input
              type="checkbox"
              name="std"
              checked={filters.std}
              onChange={handleFilterChange}
            />
            <span className="filter-label">STDs</span>
          </label>
        </div>
        {loading && <p>Loading map...</p>} {/* Show loading message while fetching */}
        {error && <p className="error-message">{error}</p>} {/* Display error if any */}
        {!loading && coordinates.lat && coordinates.lon && (
          <div className="map-container">
            <MapComponent latitude={coordinates.lat} longitude={coordinates.lon} filters={filters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
