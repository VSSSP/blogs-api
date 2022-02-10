const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const category = await categoriesService.createCategory(req.body);
  const { code, newCategory: { dataValues } } = category;
  res.status(code).json(dataValues);
};

module.exports = {
  createCategory,
};