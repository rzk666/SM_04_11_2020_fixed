import React from 'react';
// React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
// Global Styles
import './global.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
