import React, { useState, useEffect } from "react";
import "./LocationSelector.css";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  // Fetch all countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch countries
  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
    setIsLoading(false);
  };

  // Fetch states of selected country
  const fetchStates = async (country) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
    setIsLoading(false);
  };

  // Fetch cities of selected state
  const fetchCities = async (country, state) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setIsLoading(false);
  };

  // Handle country change
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSelectedCity("");
    fetchStates(selectedCountry);
  };

  // Handle state change
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedCity("");
    fetchCities(selectedCountry, selectedState);
  };

  // Handle city change
  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setResult(
      `You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`
    );
  };

  return (
    <div className="location-selector">
      <h1>Select Location</h1>
      <div className="dropdown-container">
        <div className="dropdown">
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {result && <p className="result">{result}</p>}
    </div>
  );
}

export default LocationSelector;
