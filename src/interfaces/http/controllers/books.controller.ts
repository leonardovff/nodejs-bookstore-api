import dbClient from '../../../infrastructure/database/database-client';

export const getBooks = async (req, res) => {
  const allUsers = await dbClient.book.findMany();
  res.status(200).send(allUsers);
};
