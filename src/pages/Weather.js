import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

class Weather extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    )
  }
}

export default Weather;