import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Main from './Main';
import Navbar from './Navbar';
import Authbar from './Authbar';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Authbar />
      <Main />
    </div>
  );
}

export default App;