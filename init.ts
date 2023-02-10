import * as dbClient from './src/infrastructure/database/database-client';
import { createHttpServer } from './src/infrastructure/web/http-server';
import appRoutes from './src/interfaces/http/routes';

async function init() {
  await dbClient.connect();
  const server = createHttpServer(appRoutes);
  const info = await server.start();
  console.info(`Http server started on the port ${info.port}`);
}

init()
  .catch(async (e) => {
    console.error(e);
    await dbClient.disconnect();
    process.exit(1);
  });
