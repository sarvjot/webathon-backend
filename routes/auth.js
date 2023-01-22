const AuthRouter = require('express').Router();
const authController = require('../controllers/authController');

AuthRouter.post('/signUp', authController.signUp);
AuthRouter.post('/signIn', authController.signIn);

module.exports = AuthRouter;
