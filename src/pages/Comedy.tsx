import RandomJoke from '../components/RandomJoke';
import XkcdComic from '../components/XkcdComic';
import CatFacts from '../components/CatFacts';
import '../assets/css/Comedy.css';

/**
 * Comedy page. Has components for random jokes, cat facts, and XKCD.
 */
function Comedy() {

  return (
    <div id="Comedy">
      <h1>Comedy</h1>   
      <div id="LeftComedyColumn">
        <RandomJoke />
      </div>
      <div id="RightComedyColumn">
        <CatFacts />
      </div>
      <XkcdComic />
    </div>
  )
}

export default Comedy;