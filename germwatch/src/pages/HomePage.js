import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import AutoComplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import options from "../assets/cities.json";

function HomePage() {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState(""); 
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate(`/map?city=${encodeURIComponent(city)}`);
  };

  const handleCityClick = (selectedCity) => {
    setCity(selectedCity); 
    navigate(`/map?city=${encodeURIComponent(selectedCity)}`); 
  };

  const filteredOptions =
    inputValue.length >= 3
      ? options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && city) {
      handleButtonClick(); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="suggest-container">
          <ul>
            <h1 className="font">Quick Links</h1>
            <li onClick={() => handleCityClick("New York City, New York")}>
              New York City, New York
            </li>
            <li onClick={() => handleCityClick("Los Angeles, California")}>
              Los Angeles, California
            </li>
            <li onClick={() => handleCityClick("Chicago, Illinois")}>
              Chicago, Illinois
            </li>
            <li onClick={() => handleCityClick("Houston, Texas")}>
              Houston, Texas
            </li>
            <li onClick={() => handleCityClick("Phoenix, Arizona")}>
              Phoenix, Arizona
            </li>
            <li onClick={() => handleCityClick("Philadelphia, Pennsylvania")}>
              Philadelphia, Pennsylvania
            </li>
            <li onClick={() => handleCityClick("San Antonio, Texas")}>
              San Antonio, Texas
            </li>
            <li onClick={() => handleCityClick("San Diego, California")}>
              San Diego, California
            </li>
            <li onClick={() => handleCityClick("Dallas, Texas")}>
              Dallas, Texas
            </li>
            <li onClick={() => handleCityClick("San Jose, California")}>
              San Jose, California
            </li>
          </ul>
        </div>
        <div className="right-panel">
          <div className="logo-container"></div>
          <div className="text-search-button">
            <h2 className="font">Enter a city to examine...</h2>
            <div className="search-container">
              <AutoComplete
                disablePortal
                options={filteredOptions} 
                getOptionLabel={(option) => option.label} 
                inputValue={inputValue}
                onInputChange={(event, newValue) => setInputValue(newValue)} 
                onChange={(event, newValue) => {
                  setCity(newValue?.label || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City, State"
                    variant="outlined"
                    onKeyPress={handleKeyPress}
                  />
                )}
                sx={{ width: 300 }}
              />
              <button
                className="button"
                onClick={handleButtonClick}
                disabled={city === ""}
              >
                {"->"}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
