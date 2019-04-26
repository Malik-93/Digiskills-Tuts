import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Todos from './components/Todos';

function App() {
  return (
      <Router>
    <div className="App">
    <h1>Hello React</h1>
    <Link to='/todos' >Todos</Link>
      <Switch>
      <Route path = '/todos' component={ Todos } />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
