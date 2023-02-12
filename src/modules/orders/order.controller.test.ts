import { randomUUID } from 'crypto';
import { generateOrderData } from './orders';
import { createOrder, getOrders, getOrdersForOneUser } from './orders.controller';
import OrdersService from './orders.service';

describe('OrdersControler - getOrders', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return success (code=200) and all the orders data', async () => {
    const ordersData = [generateOrderData({}), generateOrderData({})];
    jest.spyOn(OrdersService, 'getOrders').mockResolvedValue(ordersData);

    const { code, payload } = await getOrders();

    expect(OrdersService.getOrders).toHaveBeenCalled();
    expect(code).toEqual(200);
    expect(payload).toMatchObject(ordersData);
  });
});

describe('OrdersControler - getOrdersForOneUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return success (code=200) and all the orders data for one userId', async () => {
    const userId = randomUUID();
    const ordersData = [generateOrderData({ userId }), generateOrderData({})];
    jest.spyOn(OrdersService, 'getOrders').mockResolvedValue([ordersData[0]]);

    const { code, payload } = await getOrdersForOneUser({ params: { userId } });

    expect(OrdersService.getOrders).toHaveBeenCalledWith(
      { userId },
      {
        books: {
          select: { ISBN13: true, author: true, id: true, title: true },
        },
        createdAt: true,
        id: true,
        totalPriceCents: true,
      }
    );
    expect(code).toEqual(200);
    expect(payload).toMatchObject([ordersData[0]]);
  });
});

describe('OrdersControler - createOrder', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should create a new order and return the order data and code=200', async () => {
    const orderData = generateOrderData({});
    const { userId, bookIds } = orderData;
    jest.spyOn(OrdersService, 'createOrder').mockResolvedValue({
      data: orderData,
    });

    const { code, payload } = await createOrder({
      body: {
        userId,
        booksIds: bookIds,
      },
    });

    expect(OrdersService.createOrder).toHaveBeenCalledWith({
      userId,
      booksIds: bookIds,
    });
    expect(code).toEqual(200);
    expect(payload).toMatchObject(orderData);
  });

  test('should not create a order and return the 404 when the userId passed not exist', async () => {
    jest.spyOn(OrdersService, 'createOrder').mockResolvedValue({
      error: { type: 'UserNotFound', details: '' },
    });

    const { code, payload } = await createOrder({
      body: {
        userId: randomUUID(),
        booksIds: [randomUUID()],
      },
    });

    expect(code).toEqual(404);
    expect(payload).toMatchObject({ message: 'The userId passed not exist' });
  });

  test('should not create a order and return the 404 when the bookId passed not exist', async () => {
    jest.spyOn(OrdersService, 'createOrder').mockResolvedValue({
      error: { type: 'BookNotFound', details: '' },
    });

    const { code, payload } = await createOrder({
      body: {
        userId: randomUUID(),
        booksIds: [randomUUID()],
      },
    });

    expect(code).toEqual(404);
    expect(payload).toMatchObject({ message: 'Some bookId passed not exist' });
  });

  test('should not request the creation of a order and return the 422 when not passed userId/booksIds', async () => {
    jest.spyOn(OrdersService, 'createOrder');

    const { code, payload } = await createOrder({
      body: {
        userId: undefined,
        booksIds: [randomUUID()],
      },
    });

    expect(OrdersService.createOrder).not.toHaveBeenCalled();
    expect(code).toEqual(422);
    expect(payload).toMatchObject({ message: '"userId" is required' });
  });

  test(`should not request the creation of a order and return the 422
    when userId/bookIds is passed on the wrong format`, async () => {
    jest.spyOn(OrdersService, 'createOrder');

    const { code, payload } = await createOrder({
      body: {
        userId: undefined,
        booksIds: [randomUUID()],
      },
    });

    expect(OrdersService.createOrder).not.toHaveBeenCalled();
    expect(code).toEqual(422);
    expect(payload).toMatchObject({ message: '"userId" is required' });
  });
});
