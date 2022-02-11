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

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogPostsService.getBlogPostById(id);
  res.status(200).json(blogPost);
};

const editBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const blogPost = await blogPostsService.editBlogPost(id, title, content);
  res.status(200).json(blogPost);
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogPostsService.deleteBlogPost(id);
  res.status(blogPost.code).json();
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  editBlogPost,
  deleteBlogPost,
};