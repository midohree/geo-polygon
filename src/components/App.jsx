import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import MapPage from './MapPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/h3'>
          <MapPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
