const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll();
  return { code: 200, users };
};

module.exports = {
  getAll,
};