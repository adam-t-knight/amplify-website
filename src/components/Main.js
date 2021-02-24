import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/Main.css';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginToggle from './LoginToggle';
import Home from '../pages/Home';
import CatFacts from '../pages/CatFacts';
import RandomJoke from '../pages/RandomJoke';
import UpdateTrainingMax from '../pages/UpdateTrainingMax';
import Weather from '../pages/Weather';
import WorldClock from '../pages/WorldClock';
import StockTicker from '../pages/StockTicker';
import XkcdComic from '../pages/XkcdComic';
import NewYorkTimes from '../pages/NewYorkTimes';

const Main = () => {
    return (
        <div id="Main">
            <div className="row">
                <div className="col-md-12">
                    <Router>
                        <Navbar id="NavTitlebar" bg="dark" variant="dark" expand="sm" fixed="top">
                            <Navbar.Brand href="/">adam-knight.co</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <NavDropdown title="Pages" id="basic-nav-dropdown" >
                                        <NavDropdown.Item href="/cat-facts">Cat Facts</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/new-york-times">New York Times</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/random-joke">Random Joke</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/update-training-max">Update Training Max</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/stock-ticker">Stock Ticker</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/world-clock">World Clock</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/xkcd-comic">XKCD Comic</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <LoginToggle />
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                        <Switch>
                            <Route exact path='/' component={Home}></Route>
                            <Route exact path='/cat-facts' component={CatFacts}></Route>
                            <Route exact path='/new-york-times' component={NewYorkTimes}></Route>
                            <Route exact path='/random-joke' component={RandomJoke}></Route>
                            <Route exact path='/update-training-max' component={UpdateTrainingMax}></Route>
                            <Route exact path='/weather' component={Weather}></Route>
                            <Route exact path='/stock-ticker' component={StockTicker}></Route>
                            <Route exact path='/world-clock' component={WorldClock}></Route>
                            <Route exact path='/xkcd-comic' component={XkcdComic}></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default Main;