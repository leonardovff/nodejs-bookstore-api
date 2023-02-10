export const calculateTotalPriceCentsForOneOrder = (
  booksIds: string[],
  booksPrices: {[bookId in string]: number},
) => {
  const totalPriceCents = booksIds.reduce(
    (acc, bookId) => acc + booksPrices[bookId], 0
  );
  return totalPriceCents;
};
