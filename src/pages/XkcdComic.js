import React, { useState, useEffect } from "react";

const xkcdComicUrl = 'https://xkcd.com/info.0.json';

function XkcdComic() {
    const [xkcdComicData, setXkcdComic] = useState([]);

    useEffect(() => {
        getXkcdComicWithFetch();
    }, []);

    const getXkcdComicWithFetch = async () => {
        const response = await fetch(xkcdComicUrl);
        const jsonData = await response.json();
        setXkcdComic(jsonData);
        console.log("json: " + jsonData);
    };

    return (
        <div className="XkcdComic">
            <h1>An random xkcd comic from {xkcdComicUrl} :</h1>
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