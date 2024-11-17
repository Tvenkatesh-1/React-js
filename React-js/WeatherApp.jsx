import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const apiKey = "7afa38d0059cb5df9162d8c7df057da5"; // Replace with your OpenWeatherMap API key

    function handleCityChange(event) {
        setCity(event.target.value.trim());
    }
    
    async function fetchWeather() {
        if (!city) return;
    
        setLoading(true);
        setError("");
    
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
        } catch (err) {
            console.error(err); // Log the full error object for debugging
            setError(err.response?.data?.message || "City not found. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    

    function handleSearch() {
        fetchWeather();
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={handleCityChange}
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}export default WeatherApp;
