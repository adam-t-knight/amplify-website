import { useState, useEffect } from 'react';
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
  CognitoUserInterface,
} from '@aws-amplify/ui-components';
import { Button } from 'react-bootstrap';

const SHOW_LOGIN_BUTTON_TEXT = 'Show Login';
const HIDE_LOGIN_BUTTON_TEXT = 'Hide Login';

/**
 * Component to control sign in and sign out for users in nav bar
 */
const LoginToggle = () => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<
    CognitoUserInterface | undefined
  >();
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState(
    SHOW_LOGIN_BUTTON_TEXT,
  );

  /**
   * Sets auth state
   */
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData as CognitoUserInterface);
    });
  }, []);

  /**
   * Sets auth state and populates table
   */
  function toggleLogin(e: { preventDefault: () => void }) {
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
          // eslint-disable-next-line react/jsx-no-bind
          onClick={toggleLogin}
          variant="outline-light"
        >
          {loginButtonText}
        </Button>
      </div>
      <div id="LoginSignIn" hidden={!loginVisibility}>
        <AmplifyAuthenticator>
          <AmplifySignIn slot="sign-in" hideSignUp />
        </AmplifyAuthenticator>
      </div>
    </div>
  );
};

export default LoginToggle;
