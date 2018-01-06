// @flow
import { AsyncStorage, Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import reducers from '../reducers';

const url =
  Platform.OS === 'ios' ? 'http://127.0.0.1:3000/graphql' : 'http://10.0.2.2:3000/graphql';
const networkInterface = createNetworkInterface({
  uri: url,
});

networkInterface.use([
  {
    async applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      try {
        const token = await AsyncStorage.getItem('@customtwittertoken');

        if (token != null) {
          req.options.headers.authorization = `Bearer ${token}` || null;
        }
      } catch (error) {
        throw error;
      }

      return next();
    },
  },
]);

// Create a WebSocket client:
const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
  connectionParams: {},
});

const networkInterfaceWithSubs = addGraphQLSubscriptions(networkInterface, wsClient);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubs,
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);
