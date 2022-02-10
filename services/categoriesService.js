const { Category } = require('../models');

const createCategory = async (category) => {
  const newCategory = await Category.create(category);
  return { code: 201, newCategory };
};

const getAll = async () => {
  const categories = await Category.findAll();
  return { code: 200, categories };
};

module.exports = {
  createCategory,
  getAll,
};