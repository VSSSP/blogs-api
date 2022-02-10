const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const category = await categoriesService.createCategory(req.body);
  const { code, newCategory: { dataValues } } = category;
  res.status(code).json(dataValues);
};

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();
  res.status(categories.code).json(categories.categories);
};

module.exports = {
  createCategory,
  getAll,
};