import { randomUUID } from 'crypto';
import { createUser, getUsers } from './users.controller';
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

describe('UsersController - getUsers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should return success (code=200) and all the user data in the payload', async () => {
    jest.spyOn(UsersService, 'getUsers').mockReturnValue(Promise.resolve(UsersData));
    const { code, payload } = await getUsers();

    expect(code).toEqual(200);
    expect(payload).toMatchObject(UsersData);
  });
});

describe('UsersController - createUser', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should request UserService to create the user return success (code=200)', async () => {
    const userData = {
      email: 'fakeUser',
      name: 'fakeUser@fakerprovider.com',
    };
    jest.spyOn(UsersService, 'createUser').mockReturnValue(
      Promise.resolve({
        data: {
          ...userData,
          id: randomUUID(),
        },
      })
    );

    const { code, payload } = await createUser({ body: userData });

    expect(UsersService.createUser).toHaveBeenCalledWith(userData);
    expect(code).toEqual(200);
    expect(payload).toMatchObject(userData);
  });

  test(`should return not request the UserService to create a user and return 422
    when passed wrong values for email/name`, async () => {
    jest.spyOn(UsersService, 'createUser');

    const { code, payload } = await createUser({
      body: {
        email: 232,
        name: 'john',
      },
    });

    expect(UsersService.createUser).not.toHaveBeenCalled();
    expect(code).toEqual(422);
    expect(payload).toMatchObject({
      'message': '"email" must be a string',
    });
  });


  test(`should return not request the UserService to create a user and return 422
    when passed missing data (email/name)`, async () => {
    jest.spyOn(UsersService, 'createUser');

    const { code, payload } = await createUser({
      body: {
        email: 'leonardovff@gmail.com',
        name: undefined,
      },
    });

    expect(UsersService.createUser).not.toHaveBeenCalled();
    expect(code).toEqual(422);
    expect(payload).toMatchObject({
      'message': '"name" is required',
    });
  });
});
