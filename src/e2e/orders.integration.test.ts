import { default as request } from 'supertest';
import dbClient, { connect, disconnect } from '../infrastructure/database/database-client';
import booksSeed from '../infrastructure/database/seeds/books.seed';
import { createHttpServer } from '../infrastructure/web/http-server';
import appRoutes from '../interfaces/http/routes';

const { info: { app }} = createHttpServer(appRoutes);

describe('Orders routers', () => {
  afterEach(async () => {
    await dbClient.order.deleteMany();
    await dbClient.user.deleteMany();
    await dbClient.book.deleteMany();
    disconnect();
  });
  test('should create a new order', async () => {
    const books = await booksSeed(dbClient);
    const booksIds = [books[1].id, books[0].id];
    const totalPriceCents = books[1].priceCents + books[0].priceCents;
    await connect();
    // TODO: replace with a seed
    const userResponse = await request(app)
      .post('/users')
      .send({email: 'john@gmail.com', name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const response = await request(app)
      .post('/orders')
      .send({
        userId: userResponse.body.id,
        booksIds: booksIds
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject({
      bookIds: booksIds,
      userId: userResponse.body.id,
      totalPriceCents,
    });
  });
});
