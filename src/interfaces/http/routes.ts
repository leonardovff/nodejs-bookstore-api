// import booksRoutes from '../../modules/books/books.routes';
// import userRoutes from '../../modules/users/users.routes';
import { ordersRoutes } from '../../modules/orders';

const appRoutes = [
  // ...booksRoutes,
  ...ordersRoutes,
  // ...userRoutes,
];

export default appRoutes;
