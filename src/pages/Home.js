import { Fragment } from 'react';
import WorldClock from '../pages/WorldClock';
import NewYorkTimes from '../pages/NewYorkTimes';

function Home() {

  return (
    <Fragment>
      <h1>Home</h1>
      <WorldClock />
      <NewYorkTimes />
    </Fragment>
  )
}

export default Home;