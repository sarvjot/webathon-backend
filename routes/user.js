const UserRouter = require('express').Router();
const userController = require('../controllers/user');

UserRouter.get('/partof', authContoller.validateToken, userController.getPartOf);

module.exports = UserRouter;
