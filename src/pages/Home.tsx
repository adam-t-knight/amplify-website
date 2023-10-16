// import StockTicker from '../components/StockTicker';
import WorldClock from '../components/WorldClock';
// import NewYorkTimes from '../components/NewYorkTimes';
import Weather from '../components/Weather';
import XkcdComic from '../components/XkcdComic';
import '../assets/css/Home.css';

/**
 * Main landing page. Has components for news, weather, time, and stocks.
 */
function Home() {
  return (
    <div id="HomeTitle">
      <h1>Home</h1>
      <div id="LeftHomeColumn">
        <WorldClock />
        {/* <NewYorkTimes /> */}
      </div>
      <div id="RightHomeColumn">
        <Weather />
        {/* <StockTicker /> */}
      </div>
      <XkcdComic />
    </div>
  );
}

export default Home;
