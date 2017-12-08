/* @flow */
import express from 'express';
import { createServer } from 'http';

import './config/db';
import constants from './config/constants';
import mocks from './mocks';
import middleware from './config/middleware';

const app = express();

middleware(app);

const graphQLServer = createServer(app);

// mocks().then(() => {
graphQLServer.listen(constants.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App running on port: ${constants.PORT}`);
  }
});
// });
