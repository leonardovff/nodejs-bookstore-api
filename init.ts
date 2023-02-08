import * as dbCliente from './src/infrastructure/database-client';
import { setupHttpServer, startHttpServer, setupHttpRoutes } from './src/infrastructure/http-server';
import appRoutes from './src/interfaces/http/routes';

async function init() {
  await dbCliente.connect();
  const server = setupHttpServer();
  setupHttpRoutes(server, appRoutes);
  const sucess = await startHttpServer(server);
  console.info(sucess);
}

init()
  .catch(async (e) => {
    console.error(e);
    await dbCliente.disconnect();
    process.exit(1);
  });
