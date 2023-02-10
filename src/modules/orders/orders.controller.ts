import * as OrdersService from './orders.service';

export const createOrder = async ({ body: { userId, bookIds }}) => {
  const totalPriceCents = await OrdersService.calculateTotalOrderPrice(bookIds);

  await OrdersService.createOrder({
    totalPriceCents,
    userId,
    bookIds,
  });

  return { code: 200 };
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
export default getOrders;
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
      },
    },
    user: {
      select: {
        id: true,
        name: true,
      },
    }
  });

  return { code: 200, payload: orders};
};
