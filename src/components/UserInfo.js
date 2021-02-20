import '../assets/css/UserInfo.css';
import React from 'react';
import { Auth } from 'aws-amplify'
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
    
    return (
        authState === AuthState.SignedIn && user ? (
            <div className="UserGreeting">Hello, {Auth.user.username}</div>
        ) : (
            <div className="UserGreeting">Hello, guest</div>
        )
    ); 
}

export default UserInfo;