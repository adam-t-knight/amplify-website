import '../assets/css/App.css';
import Main from './Main';
import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;