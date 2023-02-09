import dbClient from '../../../infrastructure/database/database-client';

export const getBooks = async (req, res) => {
  const books = await dbClient.book.findMany();
  res.status(200).send(books);
};
