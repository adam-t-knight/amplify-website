import '../assets/css/App.css';
import Main from './Main';
import LeftSidebar from '../components/LeftSidebar';

function App() {
  return (
    <div className="App">
      <LeftSidebar />
      <Main />
    </div>
  );
}

export default App;