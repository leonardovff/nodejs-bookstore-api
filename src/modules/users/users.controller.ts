import UsersService from './users.service';

export const createUser = async ({ body: { email, name}}) => {
  const { userCreated, error } = await UsersService.createUser({email, name});
  if(error) {
    const errors = {
      UserAlreadyExistWithTheSameEmail: { message: 'The email passed is in user by another account', code: 409 },
    };
    const { code, message } = errors[error.type] || { message: 'NotMapped', code: 500};
    return { code, payload: { message, details: error.details } };
  }
  return { code: 200, payload: userCreated};
};

export const getUsers = async () => {
  const users = await UsersService.getUsers({});
  return { code: 200, payload: users };
};
