import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import './App.scss';
import InnerApp from './innerApp';

const store = configureStore();

class App extends React.Component {

  render() {
    return(
        <Provider store={store}>
            <InnerApp/>
        </Provider>
    )
  };
}

export default App;
