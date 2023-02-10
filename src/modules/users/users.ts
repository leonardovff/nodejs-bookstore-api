const createUser = ({ email, name }, userFoundByEmail? : { email }) => {
  if(userFoundByEmail && userFoundByEmail.email === email){
    return false;
  }
  return {
    email,
    name
  };
};

const Users = {
  createUser,
};

export default Users;
