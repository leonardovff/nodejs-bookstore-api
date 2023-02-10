import dbClient from '../../infrastructure/database/database-client';
import { BooksService } from '../books';
import { calculateTotalPriceCentsForOneOrder } from './orders';

export const calculateTotalOrderPriceCents = async ( bookIds: string[] ) => {
  const booksPrices = await BooksService.getBooksPrice(bookIds);
  return calculateTotalPriceCentsForOneOrder(bookIds, booksPrices);
};
// TODO: move that to interface?
export const createOrder = async ({ userId, bookIds, totalPriceCents }) => {
  await dbClient.order.create({
    data: {
      userId,
      bookIds,
      totalPriceCents,
    }
  });
};

// TODO: move that to interface?
export const getOrders = async (
  { userId } : { userId?: string },
  fields,
) => {
  const where = userId ? { userId } : undefined;
  const orders = await dbClient.order.findMany({
    where,
    select: fields,
  });
  return orders;
};
