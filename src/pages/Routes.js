import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Home';
import LoginPage from './Login';
import SignupPage from './Signup';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/home' component={HomePage} />
     </Switch>
    );
 }
}

export default Routes;
