/* @flow */
import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { createServer } from 'http';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

import './config/db';
import constants from './config/constants';
import middleware from './config/middleware';

const app = express();

middleware(app);

// app.use((req, res, next) => setTimeout(next, 1000));

/* GraphQL server setup */
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
    subscriptionsEndpoint: `ws://localhost:/${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`,
  }),
);
app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
    },
  })),
);

const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    new SubscriptionServer(
      {
        schema,
        execute,
        subscribe,
      },
      {
        server: graphQLServer,
        path: constants.SUBSCRIPTIONS_PATH,
      },
    );

    console.log(`App running on port: ${constants.PORT}`);
  }
});
