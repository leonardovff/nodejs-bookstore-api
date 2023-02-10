import { IHttpRoute } from '../../interfaces/http/routes.interface';
import { createUser, getUsers } from './users.controller';

const userRoutes: IHttpRoute[] = [
  {
    route: '/users',
    method: 'get',
    handler:  getUsers,
  },
  {
    route: '/users',
    method: 'post',
    handler:  createUser,
  }
];
export default userRoutes;
