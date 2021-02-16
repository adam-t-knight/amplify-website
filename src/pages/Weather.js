import { useState, useEffect } from "react";
import Amplify from 'aws-amplify';
import { AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

/* const API_KEY = 'keIkcwQuwHMsCqZJawOVskNUec3ErVQq'; // jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3 // cwlzjnKODPSt5tGLh63JEXDKL03vtfMB
const API_HOST = 'http://dataservice.accuweather.com/';
const API_VERSION = 'v1';

const accuWeatherLocationApiUrl = (param, group) => `${API_HOST}locations/${API_VERSION}/${param}/${group}?apikey=${API_KEY}`;
const accuWeatherApiUrl = key => `${API_HOST}forecasts/${API_VERSION}/daily/1day/${key}?apikey=${API_KEY}`;

const initialWeatherData = 
                          {
                            selected: 'default',
                            favorites: [],
                            currentCity: '',
                            cities: [],
                            removedCities: [],
                            activeCity: false
                          } */

function Weather() {
/*     const [locationData, setLocationData] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [cities, selected, favorites] = [this.state.cities, this.state.selected, this.state.favorites];

    useEffect(() => {
      getAccuLocationsDataFetch();
      getaccuWeatherDataFetch();
    }, []);

    const getAccuLocationsDataFetch = async () => {
        const response = await fetch(accuWeatherLocationApiUrl('topcities', 50));
        const jsonData = await response.json();
        setLocationData(jsonData);
    };

  const getaccuWeatherDataFetch = async () => {
      const response = await fetch(accuWeatherApiUrl(key));
      const jsonData = await response.json();
      setWeatherData(jsonData);
  }; */

    return (
      <div>
{/*         <div className="Sidebar">
          <div className="CountrySelector">
            <select value={selected} id="addCountry" onChange={this.changeCity}>
              <option disabled value="default">Choose A city</option>
              {cities.map((city, index) => <option key={index} value={city.Key}>{city.EnglishName}</option>)}
            </select>
          </div>
          <div className="favorites">
            {
              favorites.map((fav, index) => this.favoriteListItem(fav, index))
            }
          </div>
        </div>
        <Content ref={this.Content} city={this.state.currentCity} /> */}
      </div>
    );
}

export default Weather;