import { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';

const xkcdComicUrl = "https://xkcd.com/info.0.json";

function XkcdComic() {
    const [xkcdComicData, setXkcdData] = useState([]);

    async function callAPI() {
        const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
        console.log({token})
  
        const requestInfo = {
            headers: {
                Authorization: token
            }
        }
  
        const data = await API.get('ExternalAPIs', '/GetXkcdComic', requestInfo)
  
        console.log({ data })

        setXkcdData(data);
    }

    return (
        <div className="XkcdComic">
            <h1>XKCD Comic</h1>
            <button onClick={callAPI}>Get random comic</button>
            <h2>A random xkcd comic from {xkcdComicUrl} :</h2>
            <h2>Month: {xkcdComicData.month}</h2>
            <h2>Number: {xkcdComicData.num}</h2>
            <h2>Link: {xkcdComicData.link}</h2>
            <h2>Year: {xkcdComicData.year}</h2>
            <h2>News: {xkcdComicData.news}</h2>
            <h2>Safe Title: {xkcdComicData.safe_title}</h2>
            <h2>Transcript: {xkcdComicData.transcript}</h2>
            <h2>Alt Text: {xkcdComicData.alt}</h2>
            <h2>Title: {xkcdComicData.title}</h2>
            <h2>Day: {xkcdComicData.day}</h2>
            <h2>Image:</h2>
            <img className="" src={xkcdComicData.img} alt={xkcdComicData.alt} />
        </div>
    );
}

export default XkcdComic;