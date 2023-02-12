import dbClient from '../../infrastructure/database/database-client';
import { BooksService } from '../books';
import { UsersService } from '../users';
import Orders from './orders';

export const createOrder = async ({ userId, booksIds }) => {
  const users = await UsersService.getUsers({ usersIds: [userId] });
  if (!users.length) {
    return { error: { type: 'UserNotFound', details: { userId } } };
  }

  const booksPrices = await BooksService.getBooksPrice(booksIds);
  const { error, data } = Orders.create({
    userId,
    booksIds,
    booksPrices,
  });

  if (error) {
    return { error };
  }

  return {
    // TODO: move that to interface?
    data: await dbClient.order.create({
      data,
    }),
  };
};

// TODO: move that to interface?
export const getOrders = async (
  { userId }: { userId?: string },
  fields?: {
    id?: boolean,
    totalPriceCents?: boolean,
    userId?: boolean,
    bookId?: boolean,
    createdAt?: boolean,
    user?: boolean,
    books?: boolean | { select?: {
      id?: boolean,
      author?: boolean,
      title?: boolean,
      ISBN13?: boolean,
    }},
  },
) => {
  const where = userId ? { userId } : undefined;
  return await dbClient.order.findMany({
    where,
    select: fields,
  });
};

const OrdersService = {
  getOrders,
  createOrder,
};

export default OrdersService;
