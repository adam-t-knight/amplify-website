/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const xkcdComicUrl = 'https://xkcd.com/info.0.json';

  try {
    const res = await fetch(xkcdComicUrl);

    console.log(JSON.stringify(res.data));

    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
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
};
