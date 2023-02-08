import booksRoutes from './books.routes';
import userRouters from './users.routes';

export const setupRoutes = (server) => {
  server.use('/users', userRouters);
  server.use('/books', booksRoutes);
  return server;
}
