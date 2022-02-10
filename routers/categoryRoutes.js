const { Router } = require('express');

const categoriesMiddlewares = require('../middlewares/categoriesMiddlewares');
const categoriesController = require('../controllers/categoriesController');
const usersMiddlewares = require('../middlewares/usersMiddlewares');

const router = Router();

router.post('/', 
usersMiddlewares.validateToken,
categoriesMiddlewares.validateName,
categoriesController.createCategory);

router.get('/', 
usersMiddlewares.validateToken,
categoriesController.getAll);

module.exports = router;