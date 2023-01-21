const ApplicationController = require('../controllers/application')
const ApplicationRouter = require('express').Router();
const authContoller = require('../controllers/authController');

ApplicationRouter.get('/',ApplicationController.getApplication);
ApplicationRouter.post('/:eventId',authContoller.validateToken, ApplicationController.postApplication);

module.exports = ApplicationRouter;