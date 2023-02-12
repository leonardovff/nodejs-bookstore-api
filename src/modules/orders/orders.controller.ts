import Validator from 'joi';
import OrdersService from './orders.service';

const createOrderSchema = Validator.object({
  userId: Validator.string().required(),
  booksIds: Validator.array().items(Validator.string()).required(),
});

export const createOrder = async ({ body: { userId, booksIds }}) => {
  const validation = createOrderSchema.validate({ userId, booksIds });
  if (validation.error) {
    return {
      code: 422,
      payload: {
        message: validation.error.message,
        details: { email: 'string', name: 'string' },
      },
    };
  }
  const { error, data} = await OrdersService.createOrder({
    userId,
    booksIds,
  });

  if(error) {
    const errors = {
      BookNotFound: { message: 'Some bookId passed not exist', code: 404 },
      UserNotFound: { message: 'The userId passed not exist', code: 404 },
    };
    const { code, message } = errors[error.type] || { message: 'NotMapped', code: 500};
    return { code, payload: { message, details: error.details } } ;
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
