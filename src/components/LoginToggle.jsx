import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/LoginToggle.css';
import {
  AmplifySignOut,
  AmplifyAuthenticator,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import {
  AuthState,
  onAuthUIStateChange,
} from '@aws-amplify/ui-components';
import { Button } from 'react-bootstrap';

const SHOW_LOGIN_BUTTON_TEXT = 'Show Login';
const HIDE_LOGIN_BUTTON_TEXT = 'Hide Login';

/**
 * Component to control sign in and sign out for users in nav bar
 */
const LoginToggle = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [loginVisibility, setLoginVisibility] = React.useState(false);
  const [loginButtonText, setLoginButtonText] = React.useState(
    SHOW_LOGIN_BUTTON_TEXT,
  );

  /**
   * Sets auth state
   */
  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  /**
   * Sets auth state and populates table
   */
  function toggleLogin(e) {
    e.preventDefault();
    setLoginVisibility((state) => !state);
    if (loginVisibility) {
      setLoginButtonText(SHOW_LOGIN_BUTTON_TEXT);
    } else {
      setLoginButtonText(HIDE_LOGIN_BUTTON_TEXT);
    }
  }

  return authState === AuthState.SignedIn && user ? (
    <div>
      <div id="UserGreeting">Hello, {user.username}</div>
      <div id="LoginSignOut">
        <AmplifySignOut />
      </div>
    </div>
  ) : (
    <div>
      <div>
        <Button
          id="LoginToggle"
          onClick={toggleLogin}
          variant="outline-light"
        >
          {loginButtonText}
        </Button>
      </div>
      <div id="LoginSignIn" hidden={!loginVisibility}>
        <AmplifyAuthenticator hideDefault>
          <AmplifySignIn slot="sign-in" hideSignUp />
        </AmplifyAuthenticator>
      </div>
    </div>
  );
};

export default LoginToggle;
