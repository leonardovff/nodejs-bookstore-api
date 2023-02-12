import { randomUUID } from 'crypto';
import dbClient from '../../infrastructure/database/database-client';
import BooksService from './books.service';

const BooksData = [
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

describe('BooksService - getBooks', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return all books data', async () => {
    jest.spyOn(dbClient.book, 'findMany').mockResolvedValue(BooksData);

    const users = await BooksService.getBooks({});

    expect(users).toMatchObject(BooksData);
  });
  test('should return all books data requested by id', async () => {
    const bookToFind = BooksData[0];
    jest.spyOn(dbClient.book, 'findMany').mockResolvedValue([bookToFind]);

    const users = await BooksService.getBooks({ ids: [bookToFind.id] });

    expect(dbClient.book.findMany).toHaveBeenCalledWith({
      where: { id: { in: [bookToFind.id]} }
    });
    expect(users).toMatchObject([bookToFind]);
  });
  test('should return all books data requested by author', async () => {
    const bookToFind = BooksData[0];
    jest.spyOn(dbClient.book, 'findMany').mockResolvedValue([bookToFind]);

    const users = await BooksService.getBooks({ authors: [bookToFind.author] });

    expect(dbClient.book.findMany).toHaveBeenCalledWith({
      where: { author: { in: [bookToFind.author]} }
    });
    expect(users).toMatchObject([bookToFind]);
  });
});

describe('BooksService - getBooksPrice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return a hash with the bookId as the key and the priceCents as the value', async () => {
    const book1 = BooksData[0];
    const book2 = BooksData[1];
    jest.spyOn(dbClient.book, 'findMany').mockResolvedValue([book1, book2]);

    const booksPrices = await BooksService.getBooksPrice([book1.id, book2.id]);

    expect(booksPrices).toMatchObject({
      [book1.id]: book1.priceCents,
      [book2.id]: book2.priceCents
    });
  });
});
