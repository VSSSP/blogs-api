const blogPostsService = require('../services/blogPostsService');

const createBlogPost = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content } = req.body;
  const blogPost = await blogPostsService.newPost(title, content, authorization);
  res.status(blogPost.code).json({ id: blogPost.id, userId: blogPost.userId, title, content });
};

module.exports = {
  createBlogPost,
};