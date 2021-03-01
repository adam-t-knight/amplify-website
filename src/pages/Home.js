import { Fragment } from 'react';
import StockTicker from '../pages/StockTicker';
import WorldClock from '../pages/WorldClock';
import NewYorkTimes from '../pages/NewYorkTimes';
import Weather from '../pages/Weather';
import '../assets/css/Home.css';

function Home() {

  return (
    <Fragment>
      <h1>Home</h1>
      <div id="LeftHomeColumn">
        <WorldClock />
        <Weather />
      </div>
      <div id="RightHomeColumn">
        <NewYorkTimes />
        <StockTicker />
      </div>
    </Fragment>
  )
}

export default Home;