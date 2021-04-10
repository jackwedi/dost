import './App.css';
import LoginControl from './components/loginControl';
import { Segment } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        DOST
      </header>
      <Segment>
        <LoginControl/>
      </Segment>
    </div>
  );
}

export default App;
