const { Router } = require('express');

const usersController = require('../controllers/usersController');
const usersMiddlewares = require('../middlewares/usersMiddlewares');

const router = Router();

router.get('/', 
usersMiddlewares.validateToken,
usersController.getAll);

router.get('/:id', 
usersMiddlewares.validateToken,
usersMiddlewares.validateUserId,
usersController.getUserById);

router.post('/', 
usersMiddlewares.validateDisplayName,
usersMiddlewares.validateEmail,
usersMiddlewares.validatePassword,
usersMiddlewares.validateExistingEmail,
usersController.createUser);

router.delete('/me', 
usersMiddlewares.validateToken,
usersController.deleteUser);

module.exports = router;