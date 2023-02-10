const createUser = ({ email, name }, userFoundByEmail? : { email }) => {
  if(userFoundByEmail && userFoundByEmail.email === email){
    return { error: { type: 'UserAlreadyExistWithTheSameEmail', details: { email }}};
  }
  return {
    data: {
      email,
      name
    }
  };
};

const Users = {
  createUser,
};

export default Users;
