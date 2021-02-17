import { useState, useEffect } from "react";

const API_KEY = "";
const cityName = "Madison";
const stateCode = "WI";
const countryCode = "US";

const weatherUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "," + countryCode + "&" + API_KEY;

function Weather() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        getWeatherFetch();
    }, []);

    const getWeatherFetch = async () => {
        const response = await fetch(weatherUrl);
        const jsonData = await response.json();
        setWeatherData(jsonData);
    };

    return (
        <div className="CatFacts">
          <h1>Hi this is my</h1>
          <h1>{API_KEY}</h1>
        </div>
    );
}

export default Weather;