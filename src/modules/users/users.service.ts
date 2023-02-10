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

  const user = await dbClient.user.create({
    data: userData,
  });
  user;
};
const getUsers = async() => {
  const allUsers = await dbClient.user.findMany();
  return allUsers;
};

const UsersService = {
  createUser,
  getUsers,
};

export default UsersService;
