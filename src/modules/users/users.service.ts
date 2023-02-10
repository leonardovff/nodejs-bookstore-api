import dbClient from '../../infrastructure/database/database-client';
import Users from './users';

const createUser = async ({ email, name }) => {
  const userFound = await dbClient.user.findFirst({
    where: {
      email
    }
  });

  const userData = Users.createUser({ email, name }, userFound);
  if(!userData) {
    return false;
  }

  return await dbClient.user.create({
    data: userData,
  });
};
const getUsers = async({ usersIds } : { usersIds?: string[]}) => {
  const where = { id: undefined };
  if(usersIds) {
    where.id = { in: usersIds };
  }
  const allUsers = await dbClient.user.findMany({
    where,
  });
  return allUsers;
};

const UsersService = {
  createUser,
  getUsers,
};

export default UsersService;
