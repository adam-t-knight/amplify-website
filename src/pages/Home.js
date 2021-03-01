import { Fragment } from 'react';
import StockTicker from '../components/StockTicker';
import WorldClock from '../components/WorldClock';
import NewYorkTimes from '../components/NewYorkTimes';
import Weather from '../components/Weather';
import RandomJoke from '../components/RandomJoke';
import XkcdComic from '../components/XkcdComic';
import CatFacts from '../components/CatFacts';
import '../assets/css/Home.css';

function Home() {

  return (
    <div id="Home">
      <h1>Home</h1>   
      <div id="LeftHomeColumn">
        <WorldClock />
        <Weather />
      </div>
      <div id="MiddleHomeColumn">
        <XkcdComic />
        <RandomJoke />
        <CatFacts />
      </div>
      <div id="RightHomeColumn">
        <NewYorkTimes />
        <StockTicker />
      </div>
    </div>
  )
}

export default Home;