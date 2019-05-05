import React from 'react';
// import './App.css';
import Partner from './components/Partner'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Chat from './components/Chat';

function App() {
  return (
<BrowserRouter>
    <div>
  <Switch>
    <Route exact path='/'  component = { Chat } />
    <Route path='/partner' component={Partner} />
  </Switch>
  </div>
  </BrowserRouter>
  );
}

export default App;
