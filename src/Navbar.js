import './Navbar.css';
import React from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut, AmplifyGreetings, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
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
        <div>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/random-joke">
                        RandomJoke
                    </Link>
                </li>
                <li>
                    <Link to="/stock-ticker">
                        Stock Ticker
                    </Link>
                </li>
                <li>
                    <Link to="/update-training-max">
                        Update Training Max
                    </Link>
                </li>
                <li>
                    <Link to="/weather">
                        Weather
                    </Link>
                </li>
                <li>
                    <Link to="/world-clock">
                        World Clock
                    </Link>
                </li>
                <li>
                    <Link to="/xkcd-comic">
                        XKCD Comic
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;