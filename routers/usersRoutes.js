const { Router } = require('express');

const usersController = require('../controllers/usersController');
const usersMiddlewares = require('../middlewares/usersMiddlewares');

const router = Router();

router.get('/', usersController.getAll);

router.post('/', 
usersMiddlewares.validateDisplayName,
usersMiddlewares.validateEmail,
usersMiddlewares.validatePassword,
usersMiddlewares.validateExistingEmail,
usersController.createUser);

module.exports = router;