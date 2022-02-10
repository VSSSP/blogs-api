// const { Category } = require('../models');

const nameValidation = ({ name }) => {
  if (!name) return { code: 400, message: '"name" is required' };
  return false;
};

module.exports = {
  nameValidation,
};