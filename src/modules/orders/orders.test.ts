import { randomUUID } from 'crypto';
import Orders from './orders';

describe('Orders entity - create', () => {
  test('should create a order when there is just one book', () => {
    const bookId1 = randomUUID();
    const userId = randomUUID();
    const booksPrices = {
      [bookId1]: 2020,
    };

    const { data } = Orders.create({
      booksIds: [bookId1],
      booksPrices,
      userId,
    });

    expect(data).toBeTruthy();
    expect(data).toMatchObject({
      userId,
      bookIds: [bookId1],
      totalPriceCents: 2020,
    });
  });
  test('should create a create a order and calculate correctly the total price for all books in the order when there is more than one book', () => {
    const bookId1 = randomUUID();
    const bookId2 = randomUUID();
    const userId = randomUUID();
    const booksPrices = {
      [bookId1]: 2020,
      [bookId2]: 3123,
    };

    const { data: { totalPriceCents } } = Orders.create({
      booksIds: [bookId1, bookId2, bookId1],
      booksPrices,
      userId,
    });

    expect(totalPriceCents).toEqual(7163);
  });
});
