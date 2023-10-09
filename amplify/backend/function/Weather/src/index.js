/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const axios = require('axios');
  const AWS = require('aws-sdk');
  const secretName = 'WEATHER_API_KEY';
  const UNITS = 'metric';
  const EXCLUSIONS = 'minutely,hourly,alerts';

  const VIENNA = 'Vienna';
  const VANCOUVER = 'Vancouver';
  const BEIJING = 'Beijing';
  const BERLIN = 'Berlin';
  const COPENHAGEN = 'Copenhagen';
  const MADISON = 'Madison';
  const RALEIGH = 'Raleigh';

  const city = event.queryStringParameters.city;

  let LAT = '0';
  let LON = '0';

  switch (city) {
    case VIENNA:
      LAT = '48.2082';
      LON = '16.3738';
      break;
    case VANCOUVER:
      LAT = '49.2827';
      LON = '-123.1207';
      break;
    case BEIJING:
      LAT = '39.9042';
      LON = '116.4074';
      break;
    case BERLIN:
      LAT = '52.5200';
      LON = '13.4050';
      break;
    case COPENHAGEN:
      LAT = '55.6761';
      LON = '12.5683';
      break;
    case MADISON:
      LAT = '43.0731';
      LON = '-89.4012';
      break;
    case RALEIGH:
      LAT = '35.7796';
      LON = '-78.6382';
      break;
  }

  const getUrl =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    LAT +
    '&lon=' +
    LON +
    '&units=' +
    UNITS +
    '&exclude=' +
    EXCLUSIONS +
    '&appid=';

  const secretsManager = new AWS.SecretsManager();

  try {
    const data = await secretsManager
      .getSecretValue({
        SecretId: secretName,
      })
      .promise();

    if (data) {
      if (data.SecretString) {
        const secret = data.SecretString;
        const splitSecret = secret.replace(/(["{}])/g, '').split(':');

        if (event.requestContext.authorizer) {
          console.log(
            'claims: ',
            event.requestContext.authorizer.claims,
          );
        }

        try {
          const res = await axios.get(getUrl + splitSecret[1]);

          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(res.data),
          };
        } catch (e) {
          console.log(e);

          return {
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(e),
          };
        }
      }
    }
  } catch (e) {
    console.log('Error retrieving secrets');
    console.log(e);

    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(e),
    };
  }
};
