import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import moment from "moment";
import '../assets/css/Weather.css';

const initialWeatherData = {    clouds: '', 
                                dew_point: '',
                                temp: '',
                                feels_like: '',
                                humidity: '',
                                pressure: '',
                                sunrise: 0,
                                sunset: 0,
                                uvi: '',
                                visibility: ''
                            }

function Weather() {
    const [weatherData, setWeatherData] = useState(initialWeatherData);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getWeatherWithFetch();
    }, []);

    const getWeatherWithFetch = async () => {
        const data = await API.get('ExternalAPIs', '/GetWeather', '');
        if(data) {
            setWeatherData(data.current);
        }
        setIsLoaded(true);
    };

    return isLoaded && weatherData !== null ? (
        <div className="Weather">
            <h1>Weather</h1>
            <div className="WeatherContainer">
                <h2>Madison, WI, US</h2>
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
                                Clouds (%)
                            </td>
                            <td>
                                {weatherData.clouds}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Dew point (°C)
                            </td>
                            <td>
                                {weatherData.dew_point}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Temp (°C)
                            </td>
                            <td>
                                {weatherData.temp}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Feels like (°C)
                            </td>
                            <td>
                                {weatherData.feels_like}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Humidity (%)
                            </td>
                            <td>
                                {weatherData.humidity}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Pressure (hPa)
                            </td>
                            <td>
                                {weatherData.pressure}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sunrise
                            </td>
                            <td>
                                {moment(weatherData.sunrise * 1000).format("HH:mm").toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Sunset
                            </td>
                            <td>
                                {moment(weatherData.sunset * 1000).format("HH:mm").toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                UVI
                            </td>
                            <td>
                                {weatherData.uvi}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Visibility (m)
                            </td>
                            <td>
                                {weatherData.visibility}
                            </td>
                        </tr>
{/*                         <tr>
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
                        </tr> */}
{/*                         <tr>
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
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="Weather">
            <h1>Weather</h1>
            <div className="WeatherContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    );
}

export default Weather;