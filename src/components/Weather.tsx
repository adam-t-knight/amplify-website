import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import moment from 'moment';
import '../assets/css/Weather.css';

const initialCurrentWeatherData = {
  lat: 0,
  lon: 0,
  timezone: '',
  timezoneOffset: 0,
  current: {
    dt: 0,
    clouds: 0,
    dewPoint: 0,
    temp: 0,
    feelsLike: 0,
    humidity: 0,
    pressure: 0,
    sunrise: 0,
    sunset: 0,
    uvi: 0,
    visibility: 0,
    windSpeed: 0,
    windDeg: 0,
    weather: [],
  },
  daily: [],
};

type DailyWeatherData = {
  dt: number;
  clouds: number;
  dewPoint: number;
  temp: DailyTemps;
  feelsLike: DailyFeelsLikeTemps;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  uvi: number;
  pop: number;
  windSpeed: number;
  windDeg: number;
  weather: WeatherPatterns;
};

type DailyTemps = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type DailyFeelsLikeTemps = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

type CurrentWeatherData = {
  lat: number;
  lon: number;
  timezone: string;
  timezoneOffset: number;
  current: CurrentData;
  daily: Array<DailyWeatherData>;
};

type CurrentData = {
  dt: number;
  clouds: number;
  dewPoint: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  uvi: number;
  visibility: number;
  windSpeed: number;
  windDeg: number;
  weather: WeatherPatterns;
};

type WeatherPattern = {
  id: string;
  main: string;
  description: string;
  icon: string;
};

type WeatherPatterns = Array<WeatherPattern>;

/**
 * Fetches weather data based on symbols selected and passes them to the Stock component to be displayed.
 */
function Weather() {
  const [weatherCurrentData, setCurrentWeatherData] =
    useState<CurrentWeatherData>(initialCurrentWeatherData);
  const [city, setCity] = useState<string>('Madison');
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Fetches stock data based on the inputted stock symbol.
   * @param {string} city city of data to be fetched
   */
  const getWeatherWithFetch = async (selectedCity: string) => {
    setIsLoaded(false);
    const data = await API.get(
      'ExternalAPIs',
      `/GetWeather?city=${selectedCity}`,
      '',
    );
    if (data) {
      setCurrentWeatherData(data);
    }
    setIsLoaded(true);
  };

  /**
   * Fetches stock symbol on change
   */
  useEffect(() => {
    getWeatherWithFetch(city);
  }, [city]);

  /**
   * Sets the city when the dropdown changes. If inputted value is null, no change is made.
   * @param {string} city city to be set
   */
  function selectCity(selectedCity: string | null) {
    if (selectedCity) {
      setCity(selectedCity);
    }
  }

  return (
    <div id="Weather">
      <h2>Weather</h2>
      <DropdownButton
        alignRight
        title="City selector"
        id="dropdown-menu-align-right"
        onSelect={(e) => selectCity(e)}
      >
        <Dropdown.Item eventKey="Vienna">Vienna</Dropdown.Item>
        <Dropdown.Item eventKey="Vancouver">Vancouver</Dropdown.Item>
        <Dropdown.Item eventKey="Beijing">Beijing</Dropdown.Item>
        <Dropdown.Item eventKey="Berlin">Berlin</Dropdown.Item>
        <Dropdown.Item eventKey="Copenhagen">
          Copenhagen
        </Dropdown.Item>
        <Dropdown.Item eventKey="Madison">Madison</Dropdown.Item>
        <Dropdown.Item eventKey="Raleigh">Raleigh</Dropdown.Item>
      </DropdownButton>
      <span>Selected city: {city}</span>
      {isLoaded && weatherCurrentData !== null ? (
        <div className="WeatherContainer">
          <table id="WeatherTable">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Curr. Temp / Feels Like (°C)</td>
                <td>
                  {weatherCurrentData.current.temp} /{' '}
                  {weatherCurrentData.current.feelsLike}
                </td>
              </tr>
              <tr>
                <td>Low / High Temp (°C)</td>
                <td>
                  {weatherCurrentData.daily[0].temp.min} /{' '}
                  {weatherCurrentData.daily[0].temp.max}
                </td>
              </tr>
              <tr>
                <td>Humidity (%)</td>
                <td>{weatherCurrentData.current.humidity}</td>
              </tr>
              <tr>
                <td>Sunrise / Sunset</td>
                <td>
                  {moment(weatherCurrentData.current.sunrise * 1000)
                    .format('HH:mm')
                    .toLocaleString()}{' '}
                  /{' '}
                  {moment(weatherCurrentData.current.sunset * 1000)
                    .format('HH:mm')
                    .toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>Patterns</td>
                <td>
                  {weatherCurrentData.current.weather &&
                    weatherCurrentData.current.weather.map(
                      (weather) => (
                        <li key={weather.id}>
                          {weather.description}
                        </li>
                      ),
                    )}
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
