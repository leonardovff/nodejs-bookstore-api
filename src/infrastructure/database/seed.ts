import dbClient, { disconnect } from './database-client';

const books = [{
  title: 'Digital Fortress',
  ISBN13: '978-0312944926',
  author: 'Dan Brown',
  priceCents: 3290
},
{
  title: 'Dom Casmurro',
  ISBN13: '978-8567097091',
  author: 'Machado de Assis',
  priceCents: 1899
},
{
  title: 'The Schopenhauer Cure',
  ISBN13: '978-0060938109',
  author: 'Irvin D. Yalom',
  priceCents: 6849
},
{
  title: 'The Hobbit',
  ISBN13: '978-8595084742',
  author: 'J.R.R. Tolkien',
  priceCents: 3343
},];

const seed = async () => {
  const booksPromises = books.map(({
    title, ISBN13, author, priceCents
  }) => (dbClient.book.upsert({
    where: { title },
    update: {},
    create: {
      title,
      ISBN13,
      author,
      priceCents,
    },
  })));
  console.log(await Promise.all(booksPromises));
};

seed()
  .then(async () => {
    await disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await disconnect();
    process.exit(1);
  });
