import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import '../assets/css/RandomJoke.css';

const randomJokeUrl = "https://official-joke-api.appspot.com/random_joke";

function RandomJoke() {
    const [jokeData, setJokeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRandomJokeWithFetch();
    }, []);

    const getRandomJokeWithFetch = async () => {
        const response = await fetch(randomJokeUrl);
        const jsonData = await response.json();
        setJokeData(jsonData);
        setIsLoading(false);
    };

    return isLoading ? (
        <div className="RandomJoke">
            <h1>Random Joke</h1>
            <div className="JokeContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    ) : (
        <div className="RandomJoke">
            <h1>Random Joke</h1>
            <div className="JokeContainer">
                <h2>A random joke from <a href={randomJokeUrl}>The Official Joke API</a>:</h2>
                <table id="JokeTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Category
                            </th>
                            <th scope="col">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                {jokeData.id}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Type
                            </td>
                            <td>
                                {jokeData.type}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Setup
                            </td>
                            <td>
                                {jokeData.setup}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Punchline
                            </td>
                            <td id="Spoiler">
                                {jokeData.punchline}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button id="AnotherJoke" onClick={getRandomJokeWithFetch} variant="outline-dark">Another joke!</Button>
            </div>
        </div>
    );
}

export default RandomJoke;