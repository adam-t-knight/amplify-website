import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import '../assets/css/Weather.css';

function Weather() {
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getWeatherWithFetch();
    }, []);

    const getWeatherWithFetch = async () => {
        const data = await API.get('ExternalAPIs', '/GetWeather', '');
        console.log(data);
        setWeatherData(data);
        setIsLoading(false);
    };

    return isLoading ? (
        <div className="Weather">
            <h1>Weather</h1>
            <div className="WeatherContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    ) : (
        <div className="Weather">
            <h1>Weather</h1>
            <div className="WeatherContainer">
                <h2>Weather for Madison, WI, US</h2>
                <table id="WeatherTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Category
                            </th>
                            <th scope="col">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Clouds
                            </td>
                            <td>
                                {weatherData.current.clouds}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Dew point
                            </td>
                            <td>
                                {weatherData.current.dew_point}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Feels like
                            </td>
                            <td>
                                {weatherData.current.feels_like}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Humidity
                            </td>
                            <td>
                                {weatherData.current.humidity}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Pressure
                            </td>
                            <td>
                                {weatherData.current.pressure}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sunrise
                            </td>
                            <td>
                                {weatherData.current.sunrise}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sunset
                            </td>
                            <td>
                                {weatherData.current.sunset}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Temp
                            </td>
                            <td>
                                {weatherData.current.temp}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                UVI
                            </td>
                            <td>
                                {weatherData.current.uvi}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Visibility
                            </td>
                            <td>
                                {weatherData.current.visibility}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Patterns
                            </td>
                            <td>
                            {
                                weatherData.current.weather && weatherData.current.weather.map((weather, index) => (
                                    <li key={index}>
                                        {weather.description}
                                    </li>
                                ))   
                            }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Latitude
                            </td>
                            <td>
                                {weatherData.lat}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Longitude
                            </td>
                            <td>
                                {weatherData.lon}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Timezone
                            </td>
                            <td>
                                {weatherData.timezone}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Timezone_Offset
                            </td>
                            <td>
                                {weatherData.timezone_offset}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Weather;