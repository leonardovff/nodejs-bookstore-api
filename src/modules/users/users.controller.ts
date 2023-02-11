import Validator from 'joi';
import UsersService from './users.service';

const userSchema = Validator.object({
  name: Validator.string().required(),
  email: Validator.string().required(),
});

export const createUser = async ({ body: { email, name } }) => {
  const validation = userSchema.validate({ email, name });
  if (validation.error) {
    return {
      code: 422,
      payload: {
        message: validation.error.message,
        details: { email: 'string', name: 'string' },
      },
    };
  }
  const { userCreated, error } = await UsersService.createUser({ email, name });
  if (error) {
    const errors = {
      UserAlreadyExistWithTheSameEmail: {
        message: 'The email passed is in user by another account',
        code: 409,
      },
    };
    const { code, message } = errors[error.type] || { message: 'NotMapped', code: 500 };
    return { code, payload: { message, details: error.details } };
  }
  return { code: 200, payload: userCreated };
};

export const getUsers = async () => {
  const users = await UsersService.getUsers({});
  return { code: 200, payload: users };
};
