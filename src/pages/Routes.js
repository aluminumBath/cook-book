import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SingleRecipePage from './SingleRecipe';
import BookPage from './Book';
import HomePage from './Home';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/home' component={HomePage} />
        <Route path='/recipe/:id' component={SingleRecipePage} />
        <Route path='/book' component={BookPage} />
     </Switch>
    );
 }
}

export default Routes;
