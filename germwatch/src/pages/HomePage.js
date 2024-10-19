import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import '../App.css';

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

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b><center><h1 class = "germwatch-title">GermWatch</h1></center></b>
          <center><img src={"logo512.png"} alt="GermWatch Logo" className="App-logo" /></center>
        </p>
        <input
          type="text"
          placeholder="Enter City:"
          value={city} // Set the input value from state
          onChange={handleInputChange} // Handle input change
        />
        <button onClick={handleButtonClick}>-{">"}</button>{" "}
      </header>
    </div>
  );
}

export default HomePage;
