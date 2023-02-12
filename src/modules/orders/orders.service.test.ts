import { randomUUID } from 'crypto';
import dbClient from '../../infrastructure/database/database-client';
import { BooksService } from '../books';
import { UsersService } from '../users';
import { generateOrderData } from './orders';
import OrdersService from './orders.service';

describe('OrdersService - getOrders', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return all orders data', async () => {
    const OrdersData = [generateOrderData({}), generateOrderData({})];
    jest.spyOn(dbClient.order, 'findMany').mockResolvedValue(OrdersData);

    const orders = await OrdersService.getOrders({});

    expect(orders).toMatchObject(OrdersData);
  });

  test('should return all orders for one user and return only the fields request when passing userId and fields object', async () => {
    const order = generateOrderData({});
    const fields = { id: true, userId: true, bookIds: true, totalPriceCents: true };
    jest.spyOn(dbClient.order, 'findMany').mockResolvedValue([order]);

    const orders = await OrdersService.getOrders({ userId: order.userId }, fields);

    expect(orders).toMatchObject([order]);
    expect(dbClient.order.findMany).toBeCalledWith({
      where: {
        userId: order.userId,
      },
      select: fields,
    });
  });
});

describe('OrdersService - createOrder', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should create a new order for the userId and bookIds passed', async () => {
    const book1 = { id: randomUUID(), priceCents: 2030};
    const book2 = { id: randomUUID(), priceCents: 4000};
    const order = generateOrderData({
      totalPriceCents: book1.priceCents + book2.priceCents,
      bookIds: [book1.id, book2.id]
    });
    const userId = order.userId;
    jest.spyOn(UsersService, 'getUsers').mockResolvedValueOnce([{
      id: userId, email: '', name: ''
    }]);
    jest.spyOn(BooksService, 'getBooksPrice').mockResolvedValueOnce({
      [book1.id]: book1.priceCents,
      [book2.id]: book2.priceCents
    });
    jest.spyOn(dbClient.order, 'create').mockResolvedValueOnce(order);

    const { data, error} = await OrdersService.createOrder({
      userId,
      booksIds: [book1.id]
    });

    expect(error).toBeFalsy();
    expect(data).toMatchObject(order);
  });

  test('should not create a new order if bookId passed not exist', async () => {
    const book1 = { id: randomUUID(), priceCents: 2030};
    const userId = randomUUID();
    jest.spyOn(UsersService, 'getUsers').mockResolvedValueOnce([{
      id: userId, email: '', name: ''
    }]);
    jest.spyOn(BooksService, 'getBooksPrice').mockResolvedValueOnce({
      [book1.id]: book1.priceCents,
    });
    jest.spyOn(dbClient.order, 'create');

    const { data, error} = await OrdersService.createOrder({
      userId,
      booksIds: [randomUUID()]
    });

    expect(data).toBeFalsy();
    expect(error).toMatchObject({
      type: 'BookNotFound',
    });
  });

  test('should not create a new order if userId passed not exist', async () => {
    const userId = randomUUID();
    jest.spyOn(UsersService, 'getUsers').mockResolvedValueOnce([]);
    jest.spyOn(dbClient.order, 'create');

    const { data, error} = await OrdersService.createOrder({
      userId,
      booksIds: [randomUUID()]
    });

    expect(data).toBeFalsy();
    expect(error).toMatchObject({
      type: 'UserNotFound',
    });
  });
});
