import React from 'react';
// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Pages
import { HOME } from './universal/pages';
// Page Components
import HomeIndex from './pages/HomeIndex';

// I'm setting the app like this assuming it would later have additional pages
const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => (<HomeIndex {...props} page={HOME} />)} />
      </Switch>
    </Router>
  </>
);

export default App;
