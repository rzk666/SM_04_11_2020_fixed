import React from 'react';
// React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
// Global Styles
import './global.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={Admin} /> */}
        <Route path="/adminLogin/" exact component={AdminLogin} />
      </Switch>
    </Router>
  );
}

export default App;
