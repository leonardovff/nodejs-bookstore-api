import { randomUUID } from 'crypto';
import { calculateTotalPriceCentsForOneOrder } from './orders';

describe('Orders entity', () => {
  test('should calculate correctly the total price for all books in one order', () => {
    const bookId1 = randomUUID();
    const bookId2 = randomUUID();
    const booksPrices = {
      [bookId1]: 2020,
      [bookId2]: 3123,
    };

    const priceCents = calculateTotalPriceCentsForOneOrder(
      [bookId1, bookId2, bookId1],
      booksPrices
    );

    expect(priceCents).toEqual(7163);
  });
});

