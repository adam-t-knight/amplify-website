import React, { useState, useEffect } from "react";

const xkcdComicUrl = 'https://xkcd.com/info.0.json';
const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';

function XkcdComic() {
    const [xkcdComicData, setXkcdComic] = useState([]);

    useEffect(() => {
        getXkcdComicWithFetch();
    }, []);

    const getXkcdComicWithFetch = async () => {
        console.log("trying out axios on: " + corsAnywhereURL + xkcdComicUrl);
        const response = await fetch(corsAnywhereURL + xkcdComicUrl);
        const jsonData = await response.json();
        setXkcdComic(jsonData);
        console.log("json: " + jsonData);
    };

    return (
        <div className="XkcdComic">
            <h1>XKCD Comic</h1>
            <h2>An random xkcd comic from {xkcdComicUrl} :</h2>
            <h2>Number: {xkcdComicData.num}</h2>
            <h2>Link: {xkcdComicData.link}</h2>
            <h2>Year: {xkcdComicData.year}</h2>
            <h2>News: {xkcdComicData.news}</h2>
            <h2>Safe Title: {xkcdComicData.safe_title}</h2>
            <h2>Transcript: {xkcdComicData.transcript}</h2>
            <h2>Alt Text: {xkcdComicData.alt}</h2>
            <h2>Image:</h2>
            <img className="" src={xkcdComicData.img} alt={xkcdComicData.alt} />
        </div>
    );
}

export default XkcdComic;