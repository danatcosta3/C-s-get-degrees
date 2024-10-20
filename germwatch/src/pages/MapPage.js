import React, { useEffect, useState, useCallback } from "react";
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
  const [selectedDisease, setSelectedDisease] = useState("HIV");
  const [currentDiseaseData, setCurrentDiseaseData] = useState([]);

  const diseaseFiles = [
    { name: "HIV", file: "/data/hiv.csv" },
    { name: "Gonorrhea", file: "/data/gonorrhea.csv" },
    { name: "Syphillis", file: "/data/syphillis.csv" },
    { name: "Chlamydia", file: "/data/chlamydia.csv" },
    { name: "Turberculosis", file: "/data/turberculosis.csv" },
  ];

  const fetchCoordinates = useCallback(async () => {
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
      }
    } catch (err) {
      setError("Error fetching coordinates");
    } 
  }, [city]);

  const fetchDiseaseData = useCallback(async (diseaseName) => {
    try {
      const diseaseFileMap = {
        HIV: "/data/hiv.csv",
        Gonorrhea: "/data/gonorrhea.csv",
        Syphillis: "/data/syphillis.csv",
        Chlamydia: "/data/chlamydia.csv",
        Turberculosis: "/data/turberculosis.csv",
      };

      const file = diseaseFileMap[diseaseName];
      const response = await fetch(file);
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;

      const dataWithCoordinates = parsedData.map((item) => {
        const geography = item.Geography;
        const cases = item.Cases;

        if (!geography || cases == null || cases === "") return null;

        const coords = countyCoordinates[geography];
        if (!coords) return null;

        let caseCount;
        if (cases === "Data suppressed") {
          caseCount = "Data suppressed";
        } else {
          caseCount = parseInt(cases, 10);
          if (isNaN(caseCount)) {
            caseCount = null;
          }
        }

        return {
          ...item,
          lat: coords.lat,
          lon: coords.lon,
          disease: diseaseName,
          cases: caseCount,
        };
      });

      const filteredData = dataWithCoordinates.filter(
        (item) => item !== null
      );

      setCurrentDiseaseData(filteredData);
    } catch (err) {
      console.error("Error fetching disease data:", err);
    } 
  }, []);

  useEffect(() => {
    if (city) {
      fetchCoordinates();
    }
  }, [city, fetchCoordinates]);

  useEffect(() => {
    if (selectedDisease) {
      fetchDiseaseData(selectedDisease);
    }
  }, [selectedDisease, fetchDiseaseData]);

  const handleFilterChange = useCallback((event) => {
    const { value } = event.target;
    setSelectedDisease(value); 
  }, []);

  return (
    <div className="map-page">
      <h1 className="map-title">{city}</h1>
      <div className="map-and-filters">
        <div className="filter-panel">
          <h3>Data Filters</h3>
          {diseaseFiles.map(({ name }) => (
            <label key={name}>
              <input
                type="radio"
                name="diseaseFilter"
                value={name}
                checked={selectedDisease === name}
                onChange={handleFilterChange}
              />
              <span className="filter-label">{name}</span>
            </label>
          ))}
          <div className="color-legend">
            <h4>Color Legend (Cases):</h4>
            <div className="color-range">
              <span className="color-box" style={{ backgroundColor: 'yellow' }}></span>
              <span>Low</span>
            </div>
            <div className="color-range">
              <span className="color-box" style={{ backgroundColor: 'orange' }}></span>
              <span>Moderate</span>
            </div>
            <div className="color-range">
              <span className="color-box" style={{ backgroundColor: 'red' }}></span>
              <span>High</span>
            </div>
            <div className="color-range">
              <span className="color-box" style={{ backgroundColor: 'gray' }}></span>
              <span>Data Suppressed</span>
            </div>
          </div>
        </div>
        {(coordinates.lat && coordinates.lon && (
          <div className="map-container">
            <MapComponent
              key={selectedDisease}
              latitude={coordinates.lat}
              longitude={coordinates.lon}
              diseaseData={currentDiseaseData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
