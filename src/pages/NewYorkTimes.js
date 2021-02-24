import { useState, useEffect } from "react";
import { API, Storage, Function, Auth } from 'aws-amplify';

const nytTestURL = "/NewYorkTimes";
const nytURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=";

function NewYorkTimes() {
    async function callAPI() {
      const user = await Auth.currentAuthenticatedUser()
      const token = user.signInUserSession.idToken.jwtToken
      console.log({token})

      const requestInfo = {
        headers: {
          Authorization: token
        }
      }

      const data = await API.get('NewYorkTimes', '/GetNewYorkTimes', requestInfo)

      console.log({ data })
    }

/*     const [nytData, setNytData] = useState([]);

    useEffect(() => {
        getNytDataWithFetch();
    }, []);

    const getNytDataWithFetch = async () => {
        const response = await fetch(nytTestURL);
        const jsonData = await response.json();
        setNytData(jsonData);
        console.log(jsonData);
    }; */

    return (
        <div className="Joke">
            <h1>New York Times</h1>
            <button onClick={callAPI}>Call API</button>
        </div>
    );
}

export default NewYorkTimes;