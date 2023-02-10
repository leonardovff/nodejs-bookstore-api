const calculateTotalPriceCentsForOneOrder = (
  booksIds: string[],
  booksPrices: {[bookId in string]: number},
) => (booksIds.reduce(
  (acc, bookId) => acc + booksPrices[bookId], 0
));

const verifyIfTheBooksExist = (
  booksIds: string[],
  booksPrices: {[bookId in string]: number},
) => {
  const booksFound = booksIds.filter(bookId => booksPrices[bookId] !== undefined);
  return booksFound.length === booksIds.length;
};

const create = ({
  booksIds,
  booksPrices,
  userId,
}: {
  booksIds: string[],
  booksPrices: {[bookId in string]: number},
  userId: string,
}) => {
  if(!verifyIfTheBooksExist(booksIds, booksPrices)) {
    return { error: { type: 'BookNotFound', details: {}}};
  }
  const totalPriceCents = calculateTotalPriceCentsForOneOrder(booksIds, booksPrices);
  return {
    order: {
      userId,
      totalPriceCents,
      bookIds: booksIds,
    }
  };
};

const Orders = {
  create,
};

export default Orders;
