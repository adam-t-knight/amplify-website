import { useState, useEffect } from "react";

const randomJokeUrl = "https://official-joke-api.appspot.com/random_joke";

function RandomJoke() {
    const [jokeData, setJokeData] = useState([]);

    useEffect(() => {
        getRandomJokeWithFetch();
    }, []);

    const getRandomJokeWithFetch = async () => {
        const response = await fetch(randomJokeUrl);
        const jsonData = await response.json();
        setJokeData(jsonData);
    };

    return (
        <div className="Joke">
            <h1>Random Joke</h1>
            <h2>A random joke from {randomJokeUrl} :</h2>
            <h2>ID: {jokeData.id}</h2>
            <h2>Type: {jokeData.type}</h2>
            <h2>Setup: {jokeData.setup}</h2>
            <h2>
                <details>
                    <summary>Punchline:</summary>
                    {jokeData.punchline}
                </details>
            </h2>
        </div>
    );
}

export default RandomJoke;