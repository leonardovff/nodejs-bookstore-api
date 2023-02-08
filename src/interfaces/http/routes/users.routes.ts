import { IHttpRoute } from '../routes.interface';
import { createUser, getUsers } from '../controllers/users.controller';

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
