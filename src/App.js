import React, { Component } from 'react';
import View from './Yoga/View';
import logo from './logo.svg';
import DeepTree from './DeepTree';

class App extends Component {
  render() {
    return (
      <View flexDirection="column" flex={1}>
        <DeepTree
          wrap={1}
          depth={4}
          breadth={3}
          id={0}
        />
      </View>
      // <View flexDirection="column" style={{ background: 'red' }}>
      //   <View height={40} flexDirection="row" style={{ background: 'green' }}>
      //     <View height={40} width={40} style={{ background: 'purple' }} />
      //     <View flex={1} style={{ background: 'black' }}/>
      //     <View flex={1} style={{ background: 'transparent' }}/>
      //   </View>
      //   <View flex={1} style={{ background: 'blue' }} />
      //   <View flex={1} style={{ background: 'yellow' }} />
      // </View>
    );
  }
}

export default App;
