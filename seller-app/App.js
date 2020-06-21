/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import Routes from "./src/routes";
import store from "./src/root-store";
import APIService from "./src/common/utils/api-service";


export default class App extends Component {

  componentWillMount() {
    APIService.configure();
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </Provider>
    );
  }
}
