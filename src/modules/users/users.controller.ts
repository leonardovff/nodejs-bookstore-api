import UsersService from './users.service';

export const createUser = async ({ body: { email, name}}) => {
  await UsersService.createUser({email, name});
  return { code: 200 };
};

export const getUsers = async () => {
  const users = await getUsers();
  return { code: 200, payload: users };
};
