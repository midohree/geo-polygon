import React from 'react';
import { Switch, useLocation, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import MapPage from './MapPage';

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid='location-display'>{location.pathname}</div>;
};

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
