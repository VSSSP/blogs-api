const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll();
  return { code: 200, users };
};

const createUser = async (user) => {
  await User.create(user);
  return { code: 201, message: 'User created successfully' };
};

module.exports = {
  getAll,
  createUser,
};