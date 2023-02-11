import { default as request } from 'supertest';
import dbClient, { connect, disconnect } from '../infrastructure/database/database-client';
import booksSeed from '../infrastructure/database/seeds/books.seed';
import usersSeed from '../infrastructure/database/seeds/users.seed';
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
  test('POST /orders should create a new order', async () => {
    await connect();
    const books = await booksSeed({ Book: dbClient.book });
    const users = await usersSeed({ User: dbClient.user });
    const booksIds = [books[1].id, books[0].id];
    const totalPriceCents = books[1].priceCents + books[0].priceCents;

    const response = await request(app)
      .post('/orders')
      .send({
        userId: users[0].id,
        booksIds: booksIds
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject({
      bookIds: booksIds,
      userId: users[0].id,
      totalPriceCents,
    });
  });
});
