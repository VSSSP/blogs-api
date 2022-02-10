const { Router } = require('express');

const blogPostsMiddlewares = require('../middlewares/blogPostsMiddlewares');
const blogPostsController = require('../controllers/blogPostsController');
const usersMiddlewares = require('../middlewares/usersMiddlewares');

const router = Router();

router.post('/', 
usersMiddlewares.validateToken,
blogPostsMiddlewares.validateTitle,
blogPostsMiddlewares.validateContent,
blogPostsMiddlewares.validateCategoryIds,
blogPostsController.createBlogPost);

module.exports = router;