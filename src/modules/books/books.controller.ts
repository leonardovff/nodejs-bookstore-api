import * as BookService from './books.service';

export const getBooks = async () => {
  const books = await BookService.getBooks({});
  return { code: 200, payload: books};
};
