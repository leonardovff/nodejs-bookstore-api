import express  from 'express';
import expressOasGenerator from 'express-oas-generator';

export const setupHttpServer = () => {
  const app = express();
  expressOasGenerator.init(app, {});
  app.use(express.json());
  return app;
};

export const startHttpServer = (app) => {
  const port = process.env.APP_PORT || 8082;
  app.listen(port, () => {
    console.info(`Http server started on the port ${port}`);
  });
  return app;
};

