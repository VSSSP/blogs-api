const jwt = require('jsonwebtoken');
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

module.exports = {
  newPost,
  getBlogPosts,
};