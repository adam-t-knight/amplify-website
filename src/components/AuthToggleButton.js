import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/AuthToggleButton.css';
import React from 'react';
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AuthToggleButton = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    function SignOut(e) {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));

        window.location.reload();
    }
    
    return authState === AuthState.SignedIn && user ? (
        <div>
            <div id="UserGreeting">Hello, {Auth.user.username}</div>
            <Button id="SignOutButton" onClick={SignOut} variant="outline-light">Sign Out</Button>
        </div>   
    ) : (
        <div>
{/*             <Link to="/">
                Back
            </Link> */}
            <Link id="LoginLink" to="/update-training-max">
                Login
            </Link>
        </div>
    );
}

export default AuthToggleButton;