import { booksRoutes } from '../../modules/books';
import { ordersRoutes } from '../../modules/orders';
import { userRoutes } from '../../modules/users';

const appRoutes = [
  ...booksRoutes,
  ...ordersRoutes,
  ...userRoutes,
];

export default appRoutes;
