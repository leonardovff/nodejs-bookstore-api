import dbClient from '../../../infrastructure/database/database-client';

export const createOrder = async (req, res) => {
  const { userId, bookIds } = req.body;
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

  await dbClient.order.create({
    data: {
      userId,
      bookIds,
      totalPriceCents,
    }
  });

  res.status(200).send();
};

export const getOrdersForOneUser = async (req, res) => {
  const userId = req.params.userId;
  const orders = await dbClient.order.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      totalPriceCents: true,
      createdAt: true,
      books: {
        select: {
          id: true,
          title: true,
          author: true,
          ISBN13: true,
        }
      }
    },
  });
  res.status(200).send(orders);
};


export const getOrders = async (req, res) => {
  const orders = await dbClient.order.findMany({
    select: {
      id: true,
      userId: true,
      totalPriceCents: true,
      createdAt: true,
      books: {
        select: {
          id: true,
          title: true,
          author: true,
          ISBN13: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      }
    },
  });
  res.status(200).send(orders);
};
