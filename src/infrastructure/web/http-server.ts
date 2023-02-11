import express  from 'express';
import expressOasGenerator, { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import { IHttpRoute } from '../../interfaces/http/routes.interface';
import environment from '../config/environment';

export const createHttpServer = (routes: IHttpRoute[]) => {
  const app = express();
  app.use(express.json());
  expressOasGenerator.handleResponses(app, {
    specOutputPath: './docs/openapi.json',
    specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE    ,
    swaggerDocumentOptions: undefined
  });
  setupRoutes(app, routes);
  expressOasGenerator.handleRequests();
  const port = environment.port;
  return {
    info: {
      port,
      app,
    },
    start: () => startHttpServer(port, app)
  };
};

const startHttpServer = (
  port: number, app: express.Application
): Promise<{message: string, port: number}> => {
  return new Promise((res, rej) => {
    app.on('error', () => {
      rej({ error: `Error on start the http server on the port ${port}`});
    });
    return app.listen(port, () => {
      res({ message: 'Http server started', port});
    });
  });
};

const setupRoutes = (
  app: express.Application,
  routes: IHttpRoute[]
) => {
  routes.forEach(route => {
    app[route.method](route.route, async (req: express.Request, res: express.Response) => {
      try {
        const requestFields = getImportFieldsFromExpressRequest(req);
        const { code, payload } = await route.handler(requestFields);
        res.status(code || 200).send(payload);
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    });
  });
};

const getImportFieldsFromExpressRequest = (req: express.Request) => {
  return {
    params: req.params,
    body: req.body,
  };
};
