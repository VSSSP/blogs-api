const { Router } = require('express');

const blogPostsMiddlewares = require('../middlewares/blogPostsMiddlewares');
const blogPostsController = require('../controllers/blogPostsController');
const usersMiddlewares = require('../middlewares/usersMiddlewares');

const router = Router();

router.get('/',
usersMiddlewares.validateToken,
blogPostsController.getBlogPosts);

router.get('/:id',
usersMiddlewares.validateToken,
blogPostsMiddlewares.validatePostId,
blogPostsController.getBlogPostById);

router.post('/', 
usersMiddlewares.validateToken,
blogPostsMiddlewares.validateTitle,
blogPostsMiddlewares.validateContent,
blogPostsMiddlewares.validateCategoryIds,
blogPostsController.createBlogPost);

router.put('/:id', 
usersMiddlewares.validateToken,
blogPostsMiddlewares.validateTitle,
blogPostsMiddlewares.validateContent,
blogPostsMiddlewares.validateCategory,
blogPostsMiddlewares.validateUser,
blogPostsController.editBlogPost);

module.exports = router;