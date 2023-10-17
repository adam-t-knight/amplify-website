/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.info(`EVENT: ${JSON.stringify(event)}`);

  const xkcdComicUrl = 'https://xkcd.com/info.0.json';

  const response = await fetch(xkcdComicUrl, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  });

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
