

exports.handler = async (event) => {
    const axios = require('axios');
    const AWS = require('aws-sdk');
    const secretName = 'NYT_API_KEY';
    const getUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';

    const secretsManager = new AWS.SecretsManager();

    try {
        const data = await secretsManager.getSecretValue({
            SecretId: secretName,
        }).promise();
    
        if (data) {
            if (data.SecretString) {
                const secret = data.SecretString;
                const splitSecret = secret.replace(/(["{}])/g, "").split(':');

                if(event.requestContext.authorizer) {
                    console.log('claims: ', event.requestContext.authorizer.claims)
                }
                
                try {
                    const res = await axios.get(getUrl + splitSecret[1]);
            
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

            }
    
        }
    } catch (e) {
        console.log('Error retrieving secrets');
        console.log(e);

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