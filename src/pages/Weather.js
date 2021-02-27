import { useState, useEffect } from "react";
import constructionGif1 from '../assets/img/ArArea51Station9771rulersconstructiongc_icon.gif';
import constructionGif2 from '../assets/img/ArArea51Station9771rulersconstructiongeocities_static.gif';
import constructionGif3 from '../assets/img/ArArea51Station9771rulersconstructionie_logo.gif';
import constructionGif4 from '../assets/img/AtAthensOlympus5623instvitaconstruction.gif';
import constructionGif5 from '../assets/img/AtAthensRhodes1319bookconstruction.gif';
import constructionGif6 from '../assets/img/bababy_sportgpikaconstruction.gif';
import constructionGif7 from '../assets/img/HeHeartlandValley9595construction1.gif';
import constructionGif8 from '../assets/img/mimidohttcimagesunder-construction-header.ani.10.gif';
import constructionGif9 from '../assets/img/RaRainForestAndes2577movingunderconstruction.gif';
import constructionGif10 from '../assets/img/TokyoFuji7118constructsonic.gif';
import constructionGif11 from '../assets/img/under_construction1_0.gif';

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
        <div>
            <h1>Weather</h1>
            <div>
                <img src={constructionGif1} alt="under construction gif 1" />
                <img src={constructionGif2} alt="under construction gif 2" />
                <img src={constructionGif3} alt="under construction gif 3" />
                <img src={constructionGif4} alt="under construction gif 4" />
                <img src={constructionGif5} alt="under construction gif 5" />
                <img src={constructionGif6} alt="under construction gif 6" />
                <img src={constructionGif7} alt="under construction gif 7" />
                <img src={constructionGif8} alt="under construction gif 8" />
                <img src={constructionGif9} alt="under construction gif 9" />
                <img src={constructionGif10} alt="under construction gif 10" />
                <img src={constructionGif11} alt="under construction gif 11" />
            </div>
        </div>
    );
}

export default Weather;