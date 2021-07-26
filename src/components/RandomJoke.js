import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../assets/css/RandomJoke.css';

const randomJokeUrl =
  'https://official-joke-api.appspot.com/random_joke';

/**
 * Component for displaying a random joke from the official joke API. Provides a button to fetch another random joke.
 */
function RandomJoke() {
  const [jokeData, setJokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches a random joke from the joke API
   */
  const getRandomJokeWithFetch = async () => {
    const response = await fetch(randomJokeUrl);
    const jsonData = await response.json();
    setJokeData(jsonData);
    setIsLoading(false);
  };

  /**
   * Fetches on random joke on change
   */
  useEffect(() => {
    getRandomJokeWithFetch();
  }, []);

  return (
    <div id="RandomJoke">
      <h2>Random Joke</h2>
      {isLoading ? (
        <div className="JokeContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      ) : (
        <div className="JokeContainer">
          <h3>
            A random joke from{' '}
            <a href={randomJokeUrl}>The Official Joke API</a>:
          </h3>
          <table id="JokeTable">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{jokeData.id}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{jokeData.type}</td>
              </tr>
              <tr>
                <td>Setup</td>
                <td>{jokeData.setup}</td>
              </tr>
              <tr>
                <td>Punchline</td>
                <td id="Spoiler">{jokeData.punchline}</td>
              </tr>
            </tbody>
          </table>
          <Button
            id="AnotherJoke"
            onClick={getRandomJokeWithFetch}
            variant="outline-dark"
          >
            Another joke!
          </Button>
        </div>
      )}
    </div>
  );
}

export default RandomJoke;
