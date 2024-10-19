import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import '../HomePage.css';

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

  return (
    <div className="App">
      <header className="App-header">
        <div className="suggest-container">
            <ul>
                <li>City</li>
                <li>City</li>
                <li>City</li>
                <li>City</li>
                <li>City</li>
                <li>City</li>
                <li>City</li>
                <li>City</li>
            </ul>
        </div>
        <div className="logo-container">
          <img src={"GermWatchLogo2.png"} alt="GermWatch Logo" className="App-logo" />
          <h1 className="germwatch-title">GermWatch</h1>
        </div>
        <div className="search-container">
          <input 
            type="text"
            placeholder="Enter City:"
            value={city} // Set the input value from state
            onChange={handleInputChange} // Handle input change
            onKeyDown={handleKeyDown} // Listen for Enter key press
            className={city === "" ? "input-dim" : "input-normal"} // Conditional class for styling
          />
        
          <button className="button" onClick={handleButtonClick} disabled={city === ""}>
            {"->"}
          </button>
        </div>
      </header>
    </div>
  );
}
export default HomePage;