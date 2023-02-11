const users = [{
  name: 'john',
  email: 'john@fakeprovider.com',
},
{
  name: 'dom',
  email: 'dom@fakeprovider.com',
},
{
  name: 'brown',
  email: 'brown@fakeprovider.com',
},
{
  name: 'clarice',
  email: 'clarice@fakeprovider.com',
},];

const usersSeed = ({ User }) => {
  const usersPromises = users.map(({
    name, email
  }) => (User.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
    },
  })));
  return Promise.all(usersPromises);
};
export default usersSeed;
