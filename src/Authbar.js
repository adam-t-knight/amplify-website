import './Navbar.css';
import React from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut, AmplifyGreetings, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const Authbar = () => {
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
            {Auth.user ? (
                <div className="SignOut">
                    <div>Hello, {Auth.user.username}</div>
                    <AmplifySignOut />
                </div>   
            ) : (
                <div className="SignIn">
                    <AmplifyAuthenticator>
                        <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
                    </AmplifyAuthenticator>
                </div>
            )}
        </div>
    );
}

export default Authbar;