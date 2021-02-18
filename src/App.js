import './App.css';
import Main from './Main';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

function App() {
  return (
    <div className="App">
      <LeftSidebar />
      <Main />
      <RightSidebar />
    </div>
  );
}

export default App;