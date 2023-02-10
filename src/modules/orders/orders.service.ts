import dbClient from '../../infrastructure/database/database-client';

export const calculateTotalOrderPrice = async ( bookIds: string[] ) => {
  const booksRequested = await dbClient.book.findMany({
    where: {
      id: { in : bookIds }
    }
  });
  const booksPricesHash = booksRequested.reduce((books, book) => ({
    ...books,
    [book.id]: book.priceCents
  }), {});
  // Todo: verify if the ids exist in the database here
  const totalPriceCents = bookIds.reduce(
    (acc, bookId) => acc + booksPricesHash[bookId], 0
  );
  return totalPriceCents;
};
export const createOrder = async ({ userId, bookIds, totalPriceCents }) => {
  await dbClient.order.create({
    data: {
      userId,
      bookIds,
      totalPriceCents,
    }
  });
};
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
