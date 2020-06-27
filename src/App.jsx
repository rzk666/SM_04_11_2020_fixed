import React from 'react';
// React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
// Universal
import pages from './universal/pages';
// Global Styles
import './global.scss';

const { HOME, ADMIN_LOGIN } = pages;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => (<Home {...props} page={HOME} />)} />
        {/* <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={Admin} /> */}
        <Route path={`/${ADMIN_LOGIN}/`} exact render={(props) => (<AdminLogin {...props} page={ADMIN_LOGIN} />)} />
      </Switch>
    </Router>
  );
}

export default App;
