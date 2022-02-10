const jwt = require('jsonwebtoken');
const { BlogPost, User } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const newPost = async (title, content, token) => {
  const verifiedUser = jwt.verify(token, 'JWT_SECRET', jwtConfig);
  const { data: { email } } = verifiedUser;
  const getUserId = await User.findOne({ where: { email } });
  console.log(getUserId.id);
  const createPost = await BlogPost
    .create({ title, content, userId: getUserId.id, published: new Date(), updated: new Date() });
  return { code: 201, id: createPost.id, title, content, userId: getUserId.id };
};

module.exports = {
  newPost,
};