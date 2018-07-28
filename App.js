import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Scanner from './src/components/Scanner'
import store from './src/store'


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
        <Text>Hello Kitty</Text>
          <View style={{width: 400, height: 500}}>
            <Scanner />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
