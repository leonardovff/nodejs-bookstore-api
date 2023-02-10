import { IHttpRoute } from '../../interfaces/http/routes.interface';
import { getBooks } from './books.controller';

const booksRoutes: IHttpRoute[] = [
  {
    route: '/books',
    method: 'get',
    handler:  getBooks,
  },
];
export default booksRoutes;
