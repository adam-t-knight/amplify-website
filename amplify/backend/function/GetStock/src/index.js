

exports.handler = async (event) => {
    const axios = require('axios');
    const MS_API_KEY = 'efae7fcc7afc9843ad088ab88b6e3fac';

    const marketStackEODUrl = 'http://api.marketstack.com/v1/eod?access_key=' + MS_API_KEY + '&symbols=' + event.queryStringParameters.symbol;

    if(event.requestContext.authorizer) {
        console.log('claims: ', event.requestContext.authorizer.claims)
    }

    try {
        const res = await axios.get(marketStackEODUrl)

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

};