/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.info(`EVENT: ${JSON.stringify(event)}`);

  const xkcdComicUrl = 'https://xkcd.com/info.0.json';

  let responseCode = 500;
  let responseBody = "";
  
  //TODO simplify this further. Do I need the Then and the Error block?
  await fetch(xkcdComicUrl, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  })
  .then(async (response) => {
    responseCode = response.status;
    if (response.ok) {
      responseBody = JSON.stringify(await response.json());
    } else {
      throw Error(`${response.status} - ${response.statusText}`);
    }
  })
  .catch((error) => {
    console.error(error);
    responseBody = JSON.stringify(error);
  });

  return {
    statusCode: responseCode,
    body: responseBody,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  };
};
