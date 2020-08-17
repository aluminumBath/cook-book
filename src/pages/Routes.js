import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Home';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/home' component={HomePage} />
     </Switch>
    );
 }
}

export default Routes;
