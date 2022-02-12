const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const newPost = async (title, content, token) => {
  const verifiedUser = jwt.verify(token, 'JWT_SECRET', jwtConfig);
  const { data: { email } } = verifiedUser;
  const getUserId = await User.findOne({ where: { email } });
  const createPost = await BlogPost
    .create({ title, content, userId: getUserId.id, published: new Date(), updated: new Date() });
  return { code: 201, id: createPost.id, title, content, userId: getUserId.id };
};

const getBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
    }],
  });
  return blogPosts;
};

const findPost = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
    }],
  });
  return blogPost;
};

const getBlogPostById = async (id) => {
  const blogPost = await findPost(id);
  return blogPost;
};

const editBlogPost = async (id, title, content) => {
  await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
  const blogPost = await findPost(id);
  return blogPost;
};

const deleteBlogPost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return { code: 204 };
};

const searchBlogPost = async (searchTerm) => {
  const blogPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
    }],
  });
  console.log(blogPosts);
  return blogPosts;
};

module.exports = {
  newPost,
  getBlogPosts,
  getBlogPostById,
  editBlogPost,
  deleteBlogPost,
  searchBlogPost,
};