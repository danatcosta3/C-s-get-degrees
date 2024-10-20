import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../HomePage.css";
import AutoComplete from "@mui/material/Autocomplete"; // Ensure correct import
import TextField from "@mui/material/TextField"; // Ensure correct import for renderInput
import options from "../cities.json"; // Import your JSON file

function HomePage() {
  const [city, setCity] = useState(""); // State to store the input value
  const [inputValue, setInputValue] = useState(""); // State for input value for autocomplete
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleButtonClick = () => {
    // Navigate to the MapPage with the city value as a query parameter
    navigate(`/map?city=${encodeURIComponent(city)}`);
  };

  const handleCityClick = (selectedCity) => {
    setCity(selectedCity); // Set the input field to the clicked city
    navigate(`/map?city=${encodeURIComponent(selectedCity)}`); // Navigate to the map page
  };

  // Filter options based on input length
  const filteredOptions =
    inputValue.length >= 3
      ? options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      : [];

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && city) {
      handleButtonClick(); // Call the function to navigate when Enter is pressed
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
              {/* Autocomplete Component */}
              <AutoComplete
                disablePortal
                options={filteredOptions} // Using the filtered options
                getOptionLabel={(option) => option.label} // Set the label field for autocomplete
                inputValue={inputValue} // Controlled input value
                onInputChange={(event, newValue) => setInputValue(newValue)} // Update input value as the user types
                onChange={(event, newValue) => {
                  setCity(newValue?.label || ""); // Set the city when a suggestion is selected
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City, State"
                    variant="outlined"
                    onKeyPress={handleKeyPress} // Handle Enter key press
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
