import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import '../assets/css/XkcdComic.css';

const xkcdComicUrl = 'https://xkcd.com/info.0.json';
const DATE_FORMAT = 'DD MMM YYYY';

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
      <h2>XKCD</h2>
      {isLoading ? (
        <div className="XkcdContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      ) : (
        <div className="XkcdContainer">
          <h3>
            Latest comic from <a href={xkcdComicUrl}>xkcd.com</a>:
          </h3>
          <div>
            #{xkcdComicData.num},{' '}
            {moment(
              new Date(
                xkcdComicData.year,
                xkcdComicData.month,
                xkcdComicData.day,
              ),
            ).format(DATE_FORMAT)}
            , &ldquo;{xkcdComicData.title}&ldquo;
          </div>
          <div>
            <img src={xkcdComicData.img} alt={xkcdComicData.alt} />
          </div>
          <div>Alt text: {xkcdComicData.alt}</div>
        </div>
      )}
    </div>
  );
}

export default XkcdComic;
