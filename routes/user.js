const UserRouter = require('express').Router();
const userController = require('../controllers/user');
const authContoller = require('../controllers/authController');

UserRouter.get('/partof', authContoller.validateToken, userController.getPartOf);
UserRouter.get('/applied',authContoller.validateToken,userController.appliedEvents);

module.exports = UserRouter;
