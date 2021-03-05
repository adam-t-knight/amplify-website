

exports.handler = async (event) => {
    const axios = require('axios');
    const WEATHER_API_KEY = '7f16c6decfd5f094f4740bb736d96740';
    const MADISON_WI_LAT = '43.073051';
    const MADISON_WI_LON = '-89.401230';
    const UNITS = 'metric';
    // const UNIT_SYSTEM = 'SI';
    const EXCLUSIONS = 'minutely,hourly,daily,alerts';
    const onecallOpenWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='    + MADISON_WI_LAT
                                                                                            + "&lon=" + MADISON_WI_LON
                                                                                            + "&units=" + UNITS
                                                                                            + "&exclude=" + EXCLUSIONS
                                                                                            + "&appid=" + WEATHER_API_KEY;
    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    // const CLIMACELL_API_KEY = 'lqi0gKNSCgLSeRagWbFAnO1FXZgwOS0K';
    //const climaCellUrl="https://api.climacell.co/v3/locations?apikey=" + CLIMACELL_API_KEY;
    // const climaCellUrl="https://api.climacell.co/v3/locations";
    // const climaCellUrl="https://api.climacell.co/v3/realtime";

    https://api.climacell.co/v3/weather/forecast/daily?lat=43.073051&lon=-89.401230&unit_system=si&fields=weather_code&fields=temp&fields=wind_speed&fields=humidity&apikey=lqi0gKNSCgLSeRagWbFAnO1FXZgwOS0K

    if(event.requestContext.authorizer) {
        console.log('claims: ', event.requestContext.authorizer.claims)
    }

    try {
        const res = await axios.get(onecallOpenWeatherUrl)

        return {
            statusCode: 200,
            headers: {
                // "lat": MADISON_WI_LAT,
                // "lon": MADISON_WI_LON,
                // "unit_system": UNIT_SYSTEM,
                // "fields": "temp",
                // "apikey": CLIMACELL_API_KEY,
                // "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(res.data)
        }
    } catch (e) {
        console.log(e)
        
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify(e)
        }
    }

};