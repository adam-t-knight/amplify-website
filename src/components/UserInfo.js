import '../assets/css/UserInfo.css';
import React from 'react';
import { Auth } from 'aws-amplify'
import { AmplifySignOut, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const UserInfo = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (
        <div id="SignOut">
            <div>Hello, {Auth.user.username}!</div>
            <AmplifySignOut />
        </div>   
    ) : (
        <div id="SignIn">
            <div>Hello, Guest!</div>
        </div>
    );
}

export default UserInfo;