import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PaginatedComponent from './PaginatedComponent';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <PaginatedComponent {...props} />}
        />
        <Route
          exact
          path="/pokemon"
          render={(props) => <PaginatedComponent {...props} />}
        />


        <Route render={(props) => <div>Not found</div>} />

      </Switch>
    </HashRouter>



  );
}

export default App;
