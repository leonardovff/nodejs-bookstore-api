import { randomUUID } from 'crypto';
import { getBooks } from './books.controller';
import BooksService from './books.service';

describe('BooksController - getBooks', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return success (code=200) and all the user data in the payload', async () => {
    const booksData = [
      {
        id: randomUUID(),
        author: 'fake author 1',
        title: 'fake book 1',
        ISBN13: 'fakeISBN-1',
        priceCents: 5020,
        orderIDs: [],
      },
      {
        id: randomUUID(),
        author: 'fake author 1',
        title: 'fake book 1',
        ISBN13: 'fakeISBN-1',
        priceCents: 750,
        orderIDs: [],
      },
    ];
    jest.spyOn(BooksService, 'getBooks').mockResolvedValue(booksData);

    const { code, payload } = await getBooks();

    expect(code).toEqual(200);
    expect(payload.length).toEqual(booksData.length);
    expect(payload).toMatchObject(booksData);
  });
});
