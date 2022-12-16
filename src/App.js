import './App.css';
import Home from './Templates/Home'
import Read from './Templates/Read'
import Write from './Templates/Write'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const title = 'Secrets'

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Read">
            <Read/>
          </Route>
          <Route exact path="/Write">
            <Write/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
