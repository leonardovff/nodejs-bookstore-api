import { dbClient } from './../interfaces/database/mongodb-client';

export const getBooks = async (req, res) => {
  const allUsers = await dbClient.books.findMany();
  res.status(200).send(allUsers);
}
