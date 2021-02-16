import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const Auth = () => {
    const [authState, setAuthState] = React.useState({authState});
    const [user, setUser] = React.useState({user});

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="SignOut">
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
    </div>      
  ) : (
    <div className="SignIn">
      <div>Log in to make changes</div>
      <AmplifySignIn
        hideSignUp="true"
      />
    </div>
  );
}

export default Auth;