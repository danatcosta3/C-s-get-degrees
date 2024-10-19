import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../HomePage.css";

function HomePage() {
  const [city, setCity] = useState(""); // State to store the input value
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleInputChange = (e) => {
    setCity(e.target.value); // Update the state with the input value
  };

  const handleButtonClick = () => {
    // Navigate to the MapPage with the city value as a query parameter
    navigate(`/map?city=${encodeURIComponent(city)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButtonClick(); // Trigger button click on Enter key
    }
  };
  const handleCityClick = (selectedCity) => {
    setCity(selectedCity); // Set the input field to the clicked city
    navigate(`/map?city=${encodeURIComponent(selectedCity)}`); // Navigate to the map page
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
          <div className="logo-container">
            <img
              src={"GermWatchLogo2.png"}
              alt="GermWatch Logo"
              className="App-logo"
            />
            <h1 className="font">GermWatch</h1>
          </div>
          <div className="text-search-button">
            <h2 className="font">Enter a city to examine...</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Columbus, OH"
                value={city} // Set the input value from state
                onChange={handleInputChange} // Handle input change
                onKeyDown={handleKeyDown} // Listen for Enter key press
                className={city === "" ? "input-dim" : "input-normal"} // Conditional class for styling
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
