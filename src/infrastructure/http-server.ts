import express  from 'express';
import expressOasGenerator from 'express-oas-generator';
import { IHttpRoute } from '../interfaces/http/routes.interface';

export const setupHttpServer = () => {
  const app = express();
  expressOasGenerator.init(app, {});
  app.use(express.json());
  return app as express.Application;
};

export const startHttpServer = (app: express.Application) => {
  const port = process.env.APP_PORT || 8082;
  return new Promise((res, rej) => {
    app.on('error', () => {
      rej(`Error on start the http server on the port ${port}`);
    });
    return app.listen(port, () => {
      res(`Http server started on the port ${port}`);
    });
  });
};

export const setupHttpRoutes = (
  app: express.Application,
  routes: IHttpRoute[]
) => {
  routes.forEach(route => {
    app[route.method](route.route, async (req, res) => {
      try {
        await route.handler(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    });
  });
};
