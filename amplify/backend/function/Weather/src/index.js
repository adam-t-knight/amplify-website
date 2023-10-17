/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

  const secretName = 'WEATHER_API_KEY';
  let secretValue = "";

  const UNITS = 'metric';
  const EXCLUSIONS = 'minutely,hourly,alerts';

  const VIENNA = 'Vienna';
  const VANCOUVER = 'Vancouver';
  const BEIJING = 'Beijing';
  const BERLIN = 'Berlin';
  const COPENHAGEN = 'Copenhagen';
  const MADISON = 'Madison';
  const RALEIGH = 'Raleigh';

  const city = event?.queryStringParameters?.city;

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
    default:
      LAT = '35.7796';
      LON = '-78.6382';
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

  try {
    const secretClient = new SecretsManagerClient();

    const secretInput = {
      SecretId: secretName,
    };
    const secretCommand = new GetSecretValueCommand(secretInput);
    const secretCommandResponse = await secretClient.send(secretCommand);
  
    const parsedSecret = await JSON.parse(secretCommandResponse.SecretString);
    secretValue = parsedSecret[secretName];
  } catch (e) {
    const errorString = JSON.stringify(e);
    console.error(`Error retrieving secrets: ${errorString}`);

    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: errorString,
    };
  }

  const response = await fetch(getUrl + secretValue);
  const responseBody = JSON.stringify(await response.json());

  if(!response.ok) {
    console.error(`${response.status} - ${response.statusText}: ${responseBody}`);
  }

  return {
    statusCode: response.status,
    body: responseBody,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  };
};
