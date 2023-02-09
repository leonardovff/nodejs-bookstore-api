import { createOrder, getOrders, getOrdersForOneUser } from '../controllers/orders.controller';
import { IHttpRoute } from '../routes.interface';

const ordersRoutes: IHttpRoute[] = [
  {
    route: '/users/:userId/orders',
    method: 'get',
    handler:  getOrdersForOneUser,
  },
  {
    route: '/orders',
    method: 'post',
    handler:  createOrder,
  },
  {
    route: '/orders',
    method: 'get',
    handler:  getOrders,
  },
];
export default ordersRoutes;
