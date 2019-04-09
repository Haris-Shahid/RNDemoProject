import React from 'react';
import { View } from 'react-native';

import * as firebase from 'firebase';
import Routers from './src/router';
import ApiKeys from './src/Constants/apiConfig';

class App extends React.Component {
constructor(){
  super();
  console.disableYellowBox = true
if(!firebase.apps.length){
  firebase.initializeApp(ApiKeys)
}
}

  render() {
    return (
      // <Provider store={store}>
        // <View style={{ flex: 1 }}>
          <Routers />
        // </View>
      // </Provider>
    );
  }
}

export default App;
