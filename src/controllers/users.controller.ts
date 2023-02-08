import { dbClient } from './../interfaces/database/mongodb-client';

export const createUser = async (req, res) => {
  const { email, name } = req.body;
  await dbClient.user.create({
    data: {
      name,
      email
    }
  });

  res.status(200).send();
}

export const getUsers = async (req, res) => {
  const allUsers = await dbClient.user.findMany();
  res.status(200).send(allUsers);
}
