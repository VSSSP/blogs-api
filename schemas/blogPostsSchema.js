const { Category, BlogPost } = require('../models');

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

const postIdValidation = async (id) => {
  const checkIfPostExists = await BlogPost.findByPk(id);
  if (!checkIfPostExists) return { code: 404, message: 'Post does not exist' };
  return false;
};

module.exports = {
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  postIdValidation,
};