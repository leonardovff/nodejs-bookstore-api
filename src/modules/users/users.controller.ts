import dbClient from '../../infrastructure/database/database-client';

export const createUser = async ({ body: { email, name}}) => {
  await dbClient.user.create({
    data: {
      name,
      email
    }
  });
  return { code: 200 };
};

export const getUsers = async () => {
  const allUsers = await dbClient.user.findMany();
  return { code: 200, payload: allUsers };
};
