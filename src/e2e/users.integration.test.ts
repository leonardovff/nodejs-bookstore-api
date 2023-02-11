import { default as request } from 'supertest';
import dbClient, { connect, disconnect } from '../infrastructure/database/database-client';
import { createHttpServer } from '../infrastructure/web/http-server';
import appRoutes from '../interfaces/http/routes';

const { info: { app }} = createHttpServer(appRoutes);

describe('Users routers', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
  });
  test('should create a new user', async () => {
    await connect();
    request(app);

    await request(app)
      .post('/users')
      .send({email: 'john@gmail.com', name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toMatchObject([{
      email: 'john@gmail.com',
      name: 'john'
    }]);
    disconnect();
  });
});
