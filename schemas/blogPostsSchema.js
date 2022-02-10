const { Category } = require('../models');

const titleValidation = ({ title }) => {
  if (!title) return { code: 400, message: '"title" is required' };
  return false;
};

const contentValidation = ({ content }) => {
  if (!content) return { code: 400, message: '"content" is required' };
  return false;
};

const categoryIdsValidation = async ({ categoryIds }) => {
  if (!categoryIds) return { code: 400, message: '"categoryIds" is required' };
  const checkCategoriesIds = await Promise.all(categoryIds.map(async (catId) => {
    const checkIfCategoryExists = await Category.findByPk(catId);
    return checkIfCategoryExists;
  }));
  const checkAllCategories = checkCategoriesIds.some((cat) => cat === null);
  if (checkAllCategories) return { code: 400, message: '"categoryIds" not found' };
  return false;
};

module.exports = {
  titleValidation,
  contentValidation,
  categoryIdsValidation,
};