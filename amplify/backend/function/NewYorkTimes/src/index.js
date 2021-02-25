

exports.handler = async (event) => {
    const axios = require('axios');
    const xkcdComicUrl = 'https://xkcd.com/info.0.json';

    console.log("logging from inside lambda!");

    if(event.requestContext.authorizer) {
        console.log('claims: ', event.requestContext.authorizer.claims)
    }

    try {
        const res = await axios.get(xkcdComicUrl)

        console.log("data:" + res.data);
        console.log("status:" + res.status);
        console.log("statusText:" + res.statusText);
        console.log("headers:" + res.headers);
        console.log("config" + res.config);
        //console.log("my res log: " + res)
        //console.log("my res stringify log: " + JSON.stringify(e))
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
