const { Router } = require('express');

const usersController = require('../controllers/usersController');
const usersMiddlewares = require('../middlewares/usersMiddlewares');

const router = Router();

router.post('/', usersMiddlewares.validateLogin, usersController.login);

module.exports = router;