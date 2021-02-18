import '../assets/css/Navbar.css';
import React from 'react';
import { Link } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const Navbar = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    return (
        <div id="Navbar">
            <Link to="/">
                Home
            </Link>
            <Link to="/cat-facts">
                Cat Facts
            </Link>
            <Link to="/random-joke">
                Random Joke
            </Link>
            <Link to="/stock-ticker">
                Stock Ticker
            </Link>
            <Link to="/weather">
                Weather
            </Link>
            <Link to="/world-clock">
                World Clock
            </Link>
            <Link to="/xkcd-comic">
                XKCD Comic
            </Link>
        </div>
    );
}

export default Navbar;