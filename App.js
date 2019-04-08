import React from 'react';
import { View } from 'react-native';

import Routers from './src/router';

class App extends React.Component {
  componentWillMount() {
    console.disableYellowBox = true
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
