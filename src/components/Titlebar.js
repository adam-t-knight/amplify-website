import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/Titlebar.css';
import AuthToggleButton from './AuthToggleButton';
import LoginToggle from './LoginToggle';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";

const Titlebar = () => {

    return (
        <div id="Titlebar">
            <div className="row">
                <div className="col-md-12">
                    <Router>
                        <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                            <Navbar.Brand href="/">adam-knight.co</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <NavDropdown title="Pages" id="basic-nav-dropdown" >
                                        <NavDropdown.Item href="/cat-facts">Cat Facts</NavDropdown.Item>
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
                                    <AuthToggleButton />
                                    {/* <LoginToggle /> */}
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default Titlebar;