import { randomUUID } from 'crypto';
import Users from './users';


describe('Users entity - createUser', () => {
  test('should validate and create a new user', () => {
    const userData = { email: 'test@gmail.com', name: 'test'};

    const { data } = Users.createUser(userData);

    expect(data).toEqual(userData);
  });
  test('should not validate if already exist user with the same email', () => {
    const userData = { email: 'test@gmail.com', name: 'test'};
    const userFoundByEmail = {
      id: randomUUID(),
      email: 'test@gmail.com',
      name: 'another'
    };

    const { data, error } = Users.createUser(userData, userFoundByEmail);

    expect(data).toBeFalsy();
    expect(error).toMatchObject({ type: 'UserAlreadyExistWithTheSameEmail', details: { email: 'test@gmail.com'}});
  });

  test('should validate and create a new user even passing the userFound but with diff email', () => {
    const userData = { email: 'test@gmail.com', name: 'test'};
    const userFoundByEmail = {
      id: randomUUID(),
      email: 'test2@gmail.com',
      name: 'another'
    };

    const { data } = Users.createUser(userData, userFoundByEmail);

    expect(data).toEqual(userData);
  });
});

