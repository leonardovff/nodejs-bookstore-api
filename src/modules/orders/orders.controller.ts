import * as OrdersService from './orders.service';

export const createOrder = async ({ body: { userId, booksIds }}) => {
  const { error, data} = await OrdersService.createOrder({
    userId,
    booksIds,
  });

  if(error) {
    const errors = {
      BookNotFound: { message: 'Some bookId passed not exist', code: 404 },
      UserNotFound: { message: 'The userId passed not exist', code: 404 },
    };
    const { code, message } = errors[error.type];
    return { code, payload: { message, details: error.details } };
  }

  return { code: 200, payload: data };

};

export const getOrdersForOneUser = async ({ params: { userId } }) => {
  const orders = await OrdersService.getOrders({ userId }, {
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
  });

  return { code: 200, payload: orders};
};

export const getOrders = async () => {
  const orders = await OrdersService.getOrders({}, {
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
      }
    },
    user: true
  });

  return { code: 200, payload: orders};
};
