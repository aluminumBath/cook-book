import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import './App.scss';
import InnerApp from './innerApp';
import { withAuthenticator } from '@aws-amplify/ui-react'

const store = configureStore();

class App extends React.Component {

  render() {
    return(
        <Provider store={store}>
          <div className="App">
            <header>
            </header>
          </div>
          <InnerApp/>
        </Provider>
    )
  };
}

export default withAuthenticator(App);
