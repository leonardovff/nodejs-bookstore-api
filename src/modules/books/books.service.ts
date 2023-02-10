import dbClient from '../../infrastructure/database/database-client';

export const getBooksPrice = async (bookIds: string[]): Promise<{
  [bookId: string]: number
}> => {
  const booksRequested = await getBooks({ ids: bookIds });
  const booksPricesHash = booksRequested.reduce((books, book) => ({
    ...books,
    [book.id]: book.priceCents
  }), {});
  return booksPricesHash;
};

// move that to interface?
export const getBooks = async ({
  ids, authors
}: {
  ids?: string[],
  authors?: string[],
}) => {
  let where = {};
  if(ids) {
    where = {...where, ids: { in: ids }};
  }
  if(authors) {
    where = {...where, authors: { in: authors }};
  }
  return await dbClient.book.findMany({
    where
  });
};
