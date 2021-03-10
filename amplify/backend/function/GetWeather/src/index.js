

exports.handler = async (event) => {
    const axios = require('axios');
    const AWS = require('aws-sdk');
    const secretName = 'WEATHER_API_KEY';
    const MADISON_WI_LAT = '43.073051';
    const MADISON_WI_LON = '-89.401230';
    const UNITS = 'metric';
    const EXCLUSIONS = 'minutely,hourly,daily,alerts';
    const getUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='   + MADISON_WI_LAT
                                                                            + "&lon=" + MADISON_WI_LON
                                                                            + "&units=" + UNITS
                                                                            + "&exclude=" + EXCLUSIONS
                                                                            + "&appid=";

    const secretsManager = new AWS.SecretsManager();

    try {
        const data = await secretsManager.getSecretValue({
            SecretId: secretName,
        }).promise();
    
        if (data) {
            if (data.SecretString) {
                const secret = data.SecretString;
                const splitSecret = secret.replace(/(["{}])/g, "").split(':');

                if(event.requestContext.authorizer) {
                    console.log('claims: ', event.requestContext.authorizer.claims)
                }
                
                try {
                    const res = await axios.get(getUrl + splitSecret[1]);
            
                    return {
                        statusCode: 200,
                        headers: {
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

            }
    
        }
    } catch (e) {
        console.log('Error retrieving secrets');
        console.log(e);

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