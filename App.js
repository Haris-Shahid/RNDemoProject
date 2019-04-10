import React from 'react';
import * as firebase from 'firebase';
import Routers from './src/router';
import ApiKeys from './src/Constants/apiConfig';
import Store from "./src/Store";
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    console.disableYellowBox = true
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys)
    }
  }

  render() {
    return (
      <Provider store={Store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
