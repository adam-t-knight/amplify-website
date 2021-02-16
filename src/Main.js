import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import UpdateTrainingMax from './pages/UpdateTrainingMax';
import Weather from './pages/Weather';
import WorldClock from './pages/WorldClock';
import StockTicker from './pages/StockTicker';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/update-training-max' component={UpdateTrainingMax}></Route>
      <Route exact path='/weather' component={Weather}></Route>
      <Route exact path='/stock-ticker' component={StockTicker}></Route>
      <Route exact path='/world-clock' component={WorldClock}></Route>
    </Switch>
  );
}

export default Main;