import { default as request } from 'supertest';
import dbClient, { connect, disconnect } from '../infrastructure/database/database-client';
import booksSeed from '../infrastructure/database/seeds/books.seed';
import { createHttpServer } from '../infrastructure/web/http-server';
import appRoutes from '../interfaces/http/routes';

const { info: { app }} = createHttpServer(appRoutes);

describe('Books routers', () => {
  afterEach(async () => {
    await dbClient.book.deleteMany();
    disconnect();
  });

  test('GET /books should return all the books stored', async () => {
    await connect();
    const books = await booksSeed({ Book: dbClient.book });

    const response = await request(app)
      .get('/books')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body.length).toEqual(books.length);
  });
});
