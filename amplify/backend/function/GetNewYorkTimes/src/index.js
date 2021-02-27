

exports.handler = async (event) => {
    const axios = require('axios');
    const NYT_API_KEY = 's4mju6AfAyGqdWGfwWMMjDzovCjAeXGI';
    const nytMostViewedUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + NYT_API_KEY;
    const nytTopStoriesHomeUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + NYT_API_KEY;

    if(event.requestContext.authorizer) {
        console.log('claims: ', event.requestContext.authorizer.claims)
    }

    try {
        const res = await axios.get(nytTopStoriesHomeUrl)

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