import { useState, useEffect } from "react";
import '../assets/css/RandomJoke.css';

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
        <div>
            <h1>Random Joke</h1>
            <h2>A random joke from {randomJokeUrl}:</h2>
            <table id="JokeTable">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Setup
                        </th>
                        <th>
                            Punchline
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {jokeData.id}
                        </td>
                        <td>
                            {jokeData.type}
                        </td>
                        <td>
                            {jokeData.setup}
                        </td>
                        <td id="Spoiler">
                            {jokeData.punchline}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={getRandomJokeWithFetch}>Another joke!</button>
        </div>
    );
}

export default RandomJoke;