import * as mongodbClient from './interfaces/database/mongodb-client';
import { setupHttpServer, startHttpServer } from './interfaces/http/http-server';
import { setupRoutes } from './interfaces/http/routes';

async function init() {
  await mongodbClient.connect();
  const server = setupHttpServer();
  await startHttpServer(setupRoutes(server));
}

init()
  .catch(async (e) => {
    console.error(e);
    await mongodbClient.disconnect();
    process.exit(1);
  });
