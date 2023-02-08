import { PrismaClient } from '@prisma/client'
import express  from 'express';

const prisma = new PrismaClient()

const setupExpress = () => {
  const app = express();
  app.use(express.json())
  app.post('/users', async (req, res) => {
    const { email, name } = req.body;
    await prisma.user.create({
      data: {
        name,
        email
      }
    })
    res.status(200).send();
  });
  app.get('/users', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  });
  app.listen(8082, () => {
    console.log('express started')
  });
  return app;
}

async function main() {
  await prisma.$connect();
  const app = setupExpress();
}

main()
  .then(async () => {
    // await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
