import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import '../assets/css/XkcdComic.css';

const xkcdComicUrl = 'https://xkcd.com/info.0.json';

/**
 * Fetches weather data based on symbols selected and passes them to the Stock component to be displayed.
 */
function XkcdComic() {
  const [xkcdComicData, setXkcdComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches XKCD comic and sets the data variables.
   */
  const getXkcdComicWithFetch = async () => {
    const data = await API.get('ExternalAPIs', '/GetXkcdComic', '');
    setXkcdComicData(data);
    setIsLoading(false);
  };

  /**
   * Fetches XKCD comic on page load.
   */
  useEffect(() => {
    getXkcdComicWithFetch();
  }, []);

  return (
    <div id="XkcdComic">
      <h2>XKCD Comic</h2>
      {isLoading ? (
        <div className="XkcdContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      ) : (
        <div className="XkcdContainer">
          <h3>
            Latest comic from <a href={xkcdComicUrl}>xkcd.com</a>:
          </h3>
          <table id="XkcdTable">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number</td>
                <td>{xkcdComicData.num}</td>
              </tr>
              <tr>
                <td>Day</td>
                <td>{xkcdComicData.day}</td>
              </tr>
              <tr>
                <td>Month</td>
                <td>{xkcdComicData.month}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{xkcdComicData.year}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{xkcdComicData.title}</td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <img
                    src={xkcdComicData.img}
                    alt={xkcdComicData.alt}
                  />
                </td>
              </tr>
              <tr>
                <td>Alt Text</td>
                <td>{xkcdComicData.alt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default XkcdComic;
