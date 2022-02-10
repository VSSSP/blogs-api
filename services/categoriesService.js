const { Category } = require('../models');

const createCategory = async (category) => {
  const newCategory = await Category.create(category);
  return { code: 201, newCategory };
};

module.exports = {
  createCategory,
};