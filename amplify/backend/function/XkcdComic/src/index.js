/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.info(`EVENT: ${JSON.stringify(event)}`);

  const xkcdComicUrl = 'https://xkcd.com/info.0.json';
  
  await fetch(xkcdComicUrl, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  })
  .then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(`${response.status} - ${response.statusText}`);
    }
  })
  .then((responseJson) => {
    return {
      "statusCode": 200,
      "body": JSON.stringify(responseJson),
      "headers": {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": '*',
      },
    };
  })
  .catch((error) => {
    console.error(error);
    return {
      "statusCode": 400,
      "body": JSON.stringify(error),
      "headers": {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
  });
};
