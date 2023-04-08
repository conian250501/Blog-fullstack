import { Environment } from './api/v1/config/enviroment';
// import { logger } from './helpers/logger'
import api from "./api/v1"
Environment.setup();

import { Application } from 'express';
import { config } from './api/v1/config/config';
import database from './api/v1/database';

async function startDatabase() {
  await database.setup();
}

async function startApiServer() {
  const app: Application = await api.server();
  app.listen(config.SERVER_PORT, () => {
    console.log(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
    // logger.info(`Listening on port ${config.SERVER_PORT} in ${config.NODE_ENV} mode`);
  });
}

startDatabase();
startApiServer();

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});