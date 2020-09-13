import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Exception from './pages/Exceptions';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main} exact />
        <Route path='/exception' component={Exception} />
      </Switch>
    </BrowserRouter>
  );
}
