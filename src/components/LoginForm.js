import '../assets/css/LoginForm.css';
import React from 'react';
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const LoginForm = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();
    const [formVisibility, setFormVisibility] = React.useState(false);

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    function toggleForm(e) {
        e.preventDefault();
        setFormVisibility(state => !state);
    }

    return (
        <div>
            <button id="LoginToggle" onClick={toggleForm}>Toggle Login Form</button>
            <div id="LoginForm" hidden={formVisibility}>
            {
                authState === AuthState.SignedIn && user ? (
                    <div>
                        <div id="LoginSignOut">
                            <div className="UserGreeting">Hello, {Auth.user.username}</div>
                            <AmplifySignOut id="SignOutButton"/>
                        </div>
                    </div>   
                ) : (
                    <div id="LoginSignIn">
                        <AmplifyAuthenticator hideDefault={true}>
                            <AmplifySignIn slot="sign-in" hideSignUp />
                        </AmplifyAuthenticator>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default LoginForm;