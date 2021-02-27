

exports.handler = async (event) => {
    const axios = require('axios');
    const xkcdComicUrl = 'https://xkcd.com/info.0.json';

    if(event.requestContext.authorizer) {
        console.log('claims: ', event.requestContext.authorizer.claims)
    }

    try {
        const res = await axios.get(xkcdComicUrl)

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