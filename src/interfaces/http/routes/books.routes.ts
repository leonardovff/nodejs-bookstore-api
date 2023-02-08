import { IHttpRoute } from '../routes.interface';
import { getBooks } from '../controllers/books.controller';

const booksRoutes: IHttpRoute[] = [
  {
    route: '/books',
    method: 'get',
    handler:  getBooks,
  },
];
export default booksRoutes;
