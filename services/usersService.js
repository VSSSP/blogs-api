const jwt = require('jsonwebtoken');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getAll = async () => {
  const users = await User.findAll();
  return { code: 200, users };
};

const createUser = async (user) => {
  await User.create(user);
  return { code: 201, message: 'User created successfully' };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return { code: 200, user };
};

const deleteUser = async (token) => {
  const user = jwt.verify(token, 'JWT_SECRET', jwtConfig);
  const { data: { email } } = user;
  const getUserId = await User.findOne({ where: { email } });
  await User.destroy({ where: { id: getUserId.id } });
  return { code: 204 };
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
};