

exports.handler = async (event) => {
    if(event.requestContext.authorizer) {
        console.log('claims: ', event.requestContext.authorizer.claims)
    }
    const response = {
        statusCode: 200,

        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
