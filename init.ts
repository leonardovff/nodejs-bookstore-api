import * as dbCliente from './src/infrastructure/database/database-client';
import { setupHttpServer, startHttpServer, setupHttpRoutes } from './src/infrastructure/http-server';
import appRoutes from './src/interfaces/http/routes';

async function init() {
  await dbCliente.connect();
  const server = setupHttpServer();
  setupHttpRoutes(server, appRoutes);
  const success = await startHttpServer(server);
  console.info(success);
}

init()
  .catch(async (e) => {
    console.error(e);
    await dbCliente.disconnect();
    process.exit(1);
  });
