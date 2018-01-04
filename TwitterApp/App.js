// @flow
import React, { Component } from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { store, client } from './src/redux/store';
import { colors } from './src/utils/constants';

import { userLogin } from './src/redux/actions'; // redux action

import AppNavigation from './src/Navigation';
import Loading from './src/components/Loading';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends Component<{}> {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this.checkToken();
  }

  checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@customtwitter');

      if (token != null) {
        store.dispatch(userLogin());
      }
    } catch (error) {
      throw error;
    }
    this.setState({ appIsReady: true });
  };

  render() {
    if (!this.state.appIsReady) {
      return <Loading />;
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ActionSheetProvider>
          <ThemeProvider theme={colors}>
            <AppNavigation />
          </ThemeProvider>
        </ActionSheetProvider>
      </ApolloProvider>
    );
  }
}
