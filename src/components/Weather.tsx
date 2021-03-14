import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import moment from "moment";
import '../assets/css/Weather.css';

const initialWeatherData = {
    lat: 0,
    lon: 0,
    timezone: '',
    timezone_offset: 0,
    current: {
        dt: 0,
        clouds: 0, 
        dew_point: 0,
        temp: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
        uvi: 0,
        visibility: 0,
        wind_speed: 0,
        wind_deg: 0,
        weather: []
    }
}

type weatherData = {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: currentWeatherData
}

type currentWeatherData = {
    dt: number,
    clouds: number, 
    dew_point: number,
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    uvi: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: weatherPatterns
}

type weatherPattern = {
    id: string,
    main: string,
    description: string,
    icon: string
}

type weatherPatterns = Array<weatherPattern>

function Weather() {
    const [weatherData, setWeatherData] = useState<weatherData>(initialWeatherData);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getWeatherWithFetch();
    }, []);

    const getWeatherWithFetch = async () => {
        const data = await API.get('ExternalAPIs', '/GetWeather', '');
        if(data) {
            setWeatherData(data);
        }
        setIsLoaded(true);
    };

    return (
        <div id="Weather">
            <h2>Weather</h2>
            {isLoaded && weatherData !== null ? (
                <div className="WeatherContainer">
                    <h3>Madison, WI, US</h3>
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
                                    Current Temp (°C)
                                </td>
                                <td>
                                    {weatherData.current.temp}
                                </td>
                            </tr>
{/*                             <tr>
                                <td>
                                    Low/High Temp (°C)
                                </td>
                                <td>
                                    {weatherData.temp_min}/{weatherData.temp_max}
                                </td>
                            </tr> */}
                            <tr>
                                <td>
                                    Feels like (°C)
                                </td>
                                <td>
                                    {weatherData.current.feels_like}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Humidity (%)
                                </td>
                                <td>
                                    {weatherData.current.humidity}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Dew point (°C)
                                </td>
                                <td>
                                    {weatherData.current.dew_point}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Sunrise
                                </td>
                                <td>
                                    {moment(weatherData.current.sunrise * 1000).format("HH:mm").toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Sunset
                                </td>
                                <td>
                                    {moment(weatherData.current.sunset * 1000).format("HH:mm").toLocaleString()}
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
                                    Pressure (hPa)
                                </td>
                                <td>
                                    {weatherData.current.pressure}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Clouds (%)
                                </td>
                                <td>
                                    {weatherData.current.clouds}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Visibility (m)
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
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="WeatherContainer">
                    <h3>Loading! Please wait...</h3>
                </div>
            )}

        </div>
    );
}

export default Weather;