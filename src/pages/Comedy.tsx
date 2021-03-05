import RandomJoke from '../components/RandomJoke';
import XkcdComic from '../components/XkcdComic';
import CatFacts from '../components/CatFacts';
import '../assets/css/Comedy.css';

function Comedy() {

  return (
    <div id="Comedy">
      <h1>Home</h1>   
      <div id="MiddleComedyColumn">
        <XkcdComic />
        <RandomJoke />
        <CatFacts />
      </div>
    </div>
  )
}

export default Comedy;