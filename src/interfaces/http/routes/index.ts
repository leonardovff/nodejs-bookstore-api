import booksRoutes from './books.routes';
import ordersRoutes from './orders.routes';
import userRoutes from './users.routes';

const appRoutes = [
  ...booksRoutes,
  ...ordersRoutes,
  ...userRoutes,
];

export default appRoutes;
