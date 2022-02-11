const blogPostsService = require('../services/blogPostsService');

const createBlogPost = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content } = req.body;
  const blogPost = await blogPostsService.newPost(title, content, authorization);
  res.status(blogPost.code).json({ id: blogPost.id, userId: blogPost.userId, title, content });
};

const getBlogPosts = async (req, res) => {
  const blogPosts = await blogPostsService.getBlogPosts();
  res.status(200).json(blogPosts);
};

module.exports = {
  createBlogPost,
  getBlogPosts,
};