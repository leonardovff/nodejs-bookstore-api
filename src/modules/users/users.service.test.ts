import { randomUUID } from 'crypto';
import dbClient from '../../infrastructure/database/database-client';
import UsersService from './users.service';

const UsersData = [
  {
    id: randomUUID(),
    email: 'fakeuser@provider.com',
    name: 'fake user',
  },
  {
    id: randomUUID(),
    email: 'fakeuser2@provider.com',
    name: 'fake user 2',
  },
];

describe('UsersService - getUsers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return all users data', async () => {
    jest.spyOn(dbClient.user, 'findMany').mockResolvedValue(UsersData);

    const users = await UsersService.getUsers({});

    expect(users).toMatchObject(UsersData);
  });
  test('should return all user data for the userId passed', async () => {
    const userToFind = UsersData[0];
    jest.spyOn(dbClient.user, 'findMany').mockResolvedValueOnce([userToFind]);

    const users = await UsersService.getUsers({ usersIds: [userToFind.id] });

    expect(dbClient.user.findMany).toBeCalledWith({
      where: { id: { in: [userToFind.id] } },
    });
    expect(users.length).toEqual(1);
    expect(users[0].id).toEqual(userToFind.id);
  });
});

describe('UsersService - createUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should create a new user', async () => {
    jest.spyOn(dbClient.user, 'findFirst').mockResolvedValueOnce(undefined);
    const userData = {
      name: 'fakeUser',
      email: 'fakeUser@fakerprovider.com',
    };
    jest.spyOn(dbClient.user, 'create').mockResolvedValueOnce({
      id: randomUUID(),
      ...userData,
    });

    const { data, error } = await UsersService.createUser(userData);

    expect(error).toBeFalsy();
    expect(data).toMatchObject(userData);
  });
  test('should not create a user when the email received already exist', async () => {
    const userData = {
      name: 'fake suer',
      email: 'fakeUser@fakerprovider.com',
    };
    jest.spyOn(dbClient.user, 'findFirst').mockResolvedValueOnce({
      id: randomUUID(),
      name: 'anotherUser',
      email: userData.email,
    });
    jest.spyOn(dbClient.user, 'create');

    const { data, error } = await UsersService.createUser(userData);

    expect(dbClient.user.create).not.toBeCalled();
    expect(error).toBeTruthy();
    expect(data).toBeFalsy();
  });
});
