import RandomJoke from '../components/RandomJoke';
import XkcdComic from '../components/XkcdComic';
import CatFacts from '../components/CatFacts';
import '../assets/css/Comedy.css';

function Comedy() {

  return (
    <div id="Comedy">
      <h1>Comedy</h1>   
      <div id="LeftComedyColumn">
        <RandomJoke />
        <XkcdComic />
      </div>
      <div id="RightComedyColumn">
        <CatFacts />
      </div>
    </div>
  )
}

export default Comedy;