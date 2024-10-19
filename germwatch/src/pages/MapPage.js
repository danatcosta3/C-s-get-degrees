import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "../components/common/MapComponent";
import axios from "axios";
import Papa from "papaparse";
import './MapPage.css';
import { countyCoordinates } from "../assets/countyCoordinates";

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [diseaseData, setDiseaseData] = useState([]);

  const fetchCoordinates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          city
        )}&format=json&limit=1`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
        setError(null);
      } else {
        setError("City not found");
        setLoading(false);
      }
    } catch (err) {
      setError("Error fetching coordinates");
      setLoading(false);
    }
  }, [city]);

  const fetchDiseaseData = useCallback(async () => {
    try {
      const diseaseFiles = [
        { name: "HIV", file: "/data/hiv.csv" },
        { name: "Gonorrhea", file: "/data/gonorrhea.csv" },
        { name: "STD", file: "/data/Syphillis.csv" },
        { name: "TB", file: "/data/Turberculosis.csv" }
      ];

      const initialFilters = {};
      diseaseFiles.forEach((disease) => {
        initialFilters[disease.name] = false;
      });
      setFilters(initialFilters);

      const dataPromises = diseaseFiles.map(async (disease) => {
        const response = await fetch(disease.file);
        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, { header: true }).data;

        const dataWithCoordinates = parsedData.map((item) => {
          const geography = item.Geography;
          const cases = item.cases;

          if (!geography || !cases) return null;

          const coords = countyCoordinates[geography];
          if (!coords) return null;

          return {
            ...item,
            lat: coords.lat,
            lon: coords.lon,
            disease: disease.name,
            cases: parseInt(cases, 10),
          };
        });

        const filteredData = dataWithCoordinates.filter(
          (item) => item !== null
        );

        return { name: disease.name, data: filteredData };
      });

      const results = await Promise.all(dataPromises);

      setDiseaseData(results);
    } catch (err) {
      console.error("Error fetching disease data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchCoordinates();
      fetchDiseaseData();
    }
  }, [city, fetchCoordinates, fetchDiseaseData]);

  const filterColors = useMemo(
    () => ({
      HIV: "red",
      Gonorrhea: "orange",
      STD: "blue",
      TB: "green",
    }),
    []
  );

  const handleFilterChange = useCallback((event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  }, []);

  return (
    <div className="map-page">
      <h1 className="map-title">{city}</h1>
      <div className="map-and-filters">
        <div className="filter-panel">
          <h3>Data Filters</h3>
          {Object.keys(filters).map((filterName) => (
            <label key={filterName} style={{ color: filterColors[filterName] }}>
              <input
                type="checkbox"
                name={filterName}
                checked={filters[filterName]}
                onChange={handleFilterChange}
              />
              <span className="filter-label">{filterName}</span>
            </label>
          ))}
        </div>
        {loading && <p>Loading map...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && coordinates.lat && coordinates.lon && (
          <div className="map-container">
            <MapComponent
              latitude={coordinates.lat}
              longitude={coordinates.lon}
              filters={filters}
              diseaseData={diseaseData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
