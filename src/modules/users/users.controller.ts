import UsersService from './users.service';

export const createUser = async ({ body: { email, name}}) => {
  const userCreated = await UsersService.createUser({email, name});
  if(!userCreated) {
    return { code: 409 };
  }
  return { code: 200 };
};

export const getUsers = async () => {
  const users = await UsersService.getUsers({});
  return { code: 200, payload: users };
};
