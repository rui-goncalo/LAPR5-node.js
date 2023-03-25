import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';

import express from 'express';

import Logger from './loaders/logger';
import bodyParser from 'body-parser';

async function startServer() {
  var bodyParser = require('body-parser');
  var cors = require('cors');


  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  await require('./loaders').default({ expressApp: app });

  app
    .listen(config.port, () => {
      console.log('Server listening on port: ' + config.port);

      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
      return;
    });
}

startServer();
