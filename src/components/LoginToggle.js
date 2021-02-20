import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/LoginToggle.css';
import React from 'react';
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const SHOW_LOGIN_BUTTON_TEXT = "Show Login";
const HIDE_LOGIN_BUTTON_TEXT = "Hide Login";

const LoginToggle = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();
    const [loginVisibility, setLoginVisibility] = React.useState(false);
    const [loginButtonText, setLoginButtonText] = React.useState(SHOW_LOGIN_BUTTON_TEXT);

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    function toggleLogin(e) {
        e.preventDefault();
        setLoginVisibility(state => !state);
        {
            loginVisibility ? (
                setLoginButtonText(SHOW_LOGIN_BUTTON_TEXT)
            ) : (
                setLoginButtonText(HIDE_LOGIN_BUTTON_TEXT)
            );
        }
    }
    
    return authState === AuthState.SignedIn && user ? (
        <div>
            <div id="UserGreeting">Hello, {user.username}</div>
            <div id="LoginSignOut">
                <AmplifySignOut/>
            </div>
        </div>   
    ) : (
        <div>
            <div>
                <Button id="LoginToggle" onClick={toggleLogin} variant="outline-light">{loginButtonText}</Button>
            </div>
            <div id="LoginSignIn" hidden={!loginVisibility}>
                <AmplifyAuthenticator hideDefault={true}>
                    <AmplifySignIn slot="sign-in" hideSignUp />
                </AmplifyAuthenticator>
            </div>
        </div>
    );
}

export default LoginToggle;