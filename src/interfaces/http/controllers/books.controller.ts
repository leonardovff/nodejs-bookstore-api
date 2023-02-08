import dbClient from '../../../infrastructure/database-client';

export const getBooks = async (req, res) => {
  const allUsers = await dbClient.books.findMany();
  res.status(200).send(allUsers);
};
