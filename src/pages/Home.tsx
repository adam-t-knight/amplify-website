import StockTicker from '../components/StockTicker';
import WorldClock from '../components/WorldClock';
import NewYorkTimes from '../components/NewYorkTimes';
import Weather from '../components/Weather';
import '../assets/css/Home.css';

function Home() {

  return (
    <div id="Home">
      <h1>Home</h1>   
      <div id="LeftHomeColumn">
        <WorldClock />
        <NewYorkTimes />
      </div>
      <div id="RightHomeColumn">
        <Weather />
        <StockTicker />
      </div>
    </div>
  )
}

export default Home;