const jwt = require('jsonwebtoken');
const { Category, BlogPost, User } = require('../models');
const blogPostsService = require('../services/blogPostsService');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

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

const userValidation = async (token, id) => {
  const verifiedUser = jwt.verify(token, 'JWT_SECRET', jwtConfig);
  const { data: { email } } = verifiedUser;
  const getUserId = await User.findOne({ where: { email } });
  const blogPost = await BlogPost.findByPk(id);
  if (getUserId.id !== blogPost.userId) return { code: 401, message: 'Unauthorized user' };
  return false;
  // should be in user schemas
};

const categoriesValidation = async ({ categoryIds }) => {
  if (categoryIds) {
    return { code: 400, message: 'Categories cannot be edited' };
  }
  return false;
};

const queryValidation = async (searchTerm) => {
  if (searchTerm === '') {
    const allPosts = await blogPostsService.getBlogPosts();
    return { code: 200, allPosts };
  }
  return false;
};

module.exports = {
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  postIdValidation,
  userValidation,
  categoriesValidation,
  queryValidation,
};