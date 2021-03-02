import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/Main.css';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginToggle from './LoginToggle';
import Home from '../pages/Home';
import Comedy from '../pages/Comedy';
import UpdateTrainingMax from '../pages/UpdateTrainingMax';

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
                                        <NavDropdown.Item href="/comedy">Comedy</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/update-training-max">Update Training Max</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <LoginToggle />
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                        <Switch>
                            <Route exact path='/' component={Home}></Route>
                            <Route exact path='/comedy' component={Comedy}></Route>
                            <Route exact path='/update-training-max' component={UpdateTrainingMax}></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default Main;