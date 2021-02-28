import { Fragment } from 'react';
import WorldClock from '../pages/WorldClock';
import NewYorkTimes from '../pages/NewYorkTimes';
import Weather from '../pages/Weather';

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
      </div>
    </Fragment>
  )
}

export default Home;