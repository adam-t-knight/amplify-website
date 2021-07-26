import { useState, useEffect } from 'react';
import '../assets/css/CatFacts.css';

const catFactsUrl = 'https://cat-fact.herokuapp.com/facts';

/**
 * A component that shows a list of cat facts fetched from an external site
 */
function CatFacts() {
  const [catFactsData, setCatFactsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches cat facts
   */
  const getCatFactsWithFetch = async () => {
    const response = await fetch(catFactsUrl);
    const jsonData = await response.json();
    setCatFactsData(jsonData);
    setIsLoading(false);
  };

  /**
   * Fetches cat facts on change
   */
  useEffect(() => {
    getCatFactsWithFetch();
  }, []);

  return (
    <div id="CatFacts">
      <h2>Cat Facts</h2>
      {isLoading ? (
        <div className="CatFactsContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      ) : (
        <div className="CatFactsContainer">
          <h3>
            Random cat facts from{' '}
            <a href={catFactsUrl}>The Cat Facts API</a>:
          </h3>
          <table id="CatFactsTable">
            <thead>
              <tr>
                <th>Index</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {catFactsData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CatFacts;
