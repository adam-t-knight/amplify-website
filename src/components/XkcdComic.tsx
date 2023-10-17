import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import '../assets/css/XkcdComic.css';

const xkcdComicUrl = 'https://xkcd.com/info.0.json';
const DATE_FORMAT = 'DD MMM YYYY';

type Comic = {
  year: number;
  month: number;
  day: number;
  num: number;
  title: string;
  img: string;
  alt: string;
};

/**
 * Fetches weather data based on symbols selected and passes them to the Stock component to be displayed.
 */
function XkcdComic() {
  const [xkcdComicData, setXkcdComicData] = useState<Comic>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  /**
   * Fetches XKCD comic and sets the data variables.
   */
  const getXkcdComicWithFetch = async () => {
    const data = await API.get('HomeAPI', '/xkcd-comic', {});
    setXkcdComicData(data);
    setIsLoaded(true);
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
      {isLoaded && xkcdComicData ? (
        <div className="XkcdContainer">
          <h3>
            Latest comic from <a href={xkcdComicUrl}>xkcd.com</a>:
          </h3>
          <div id="XkcdInfo">
            <strong>
              #{xkcdComicData.num},{' '}
              {moment(
                new Date(
                  xkcdComicData.year,
                  xkcdComicData.month - 1,
                  xkcdComicData.day,
                ),
              ).format(DATE_FORMAT)}
              , &ldquo;{xkcdComicData.title}&ldquo;
            </strong>
          </div>
          <div id="XkcdImage">
            <img src={xkcdComicData.img} alt={xkcdComicData.alt} />
          </div>
          <p id="XkcdAltText">
            <strong>Alt text:</strong> {xkcdComicData.alt}
          </p>
        </div>
      ) : (
        <div className="XkcdContainer">
          <h3>Loading! Please wait...</h3>
        </div>
      )}
    </div>
  );
}

export default XkcdComic;
