/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const xkcdComicUrl = 'https://xkcd.com/info.0.json';

  fetch(xkcdComicUrl, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  })
    .then((response) => response.json())
    // use response of network on fetch Promise resolve
    .then((data) => {
      console.log(data);
      return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(data),
      };
    })
    // handle fetch Promise error
    .catch((error) => {
      console.log(error);

      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify(error),
      };
    });
};
