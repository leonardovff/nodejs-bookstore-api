import booksRoutes from './books.routes';
import userRoutes from './users.routes';

const appRoutes = [
  ...booksRoutes,
  ...userRoutes,
];

export default appRoutes;
