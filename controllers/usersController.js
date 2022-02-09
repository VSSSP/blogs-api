const usersService = require('../services/usersService');

const getAll = async (_req, res) => {
  const users = await usersService.getAll();
  res.status(users.code).json(users);
};

module.exports = {
  getAll,
};