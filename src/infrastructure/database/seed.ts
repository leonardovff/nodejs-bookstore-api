import dbClient, { disconnect } from './database-client';
import booksSeed from './seeds/books.seed';

const seed = async () => {
  const seeds = await Promise.all([
    booksSeed(dbClient)
  ]);
  console.log('seeds perfomed', { seeds  });
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
