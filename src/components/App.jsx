import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import MapPage from './MapPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/h3'>
          <MapPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
