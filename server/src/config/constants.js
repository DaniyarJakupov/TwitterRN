/* @flow */

export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://localhost/tweeter-development',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'twisecret314',
  SUBSCRIPTIONS_PATH: '/subscriptions',
};
