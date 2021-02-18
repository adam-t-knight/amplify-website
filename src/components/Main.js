import '../assets/css/Main.css';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CatFacts from '../pages/CatFacts';
import RandomJoke from '../pages/RandomJoke';
import UpdateTrainingMax from '../pages/UpdateTrainingMax';
import Weather from '../pages/Weather';
import WorldClock from '../pages/WorldClock';
import StockTicker from '../pages/StockTicker';
import XkcdComic from '../pages/XkcdComic';

const Main = () => {
  return (
    <div id="Main">
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/cat-facts' component={CatFacts}></Route>
        <Route exact path='/random-joke' component={RandomJoke}></Route>
        <Route exact path='/update-training-max' component={UpdateTrainingMax}></Route>
        <Route exact path='/weather' component={Weather}></Route>
        <Route exact path='/stock-ticker' component={StockTicker}></Route>
        <Route exact path='/world-clock' component={WorldClock}></Route>
        <Route exact path='/xkcd-comic' component={XkcdComic}></Route>
      </Switch>
    </div>
  );
}

export default Main;