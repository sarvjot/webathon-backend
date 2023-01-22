const ApplicationController = require('../controllers/application')
const ApplicationRouter = require('express').Router();
const authContoller = require('../controllers/authController');

ApplicationRouter.get('/:eventId', authContoller.validateToken, ApplicationController.getApplication);
ApplicationRouter.post('/:eventId', authContoller.validateToken, ApplicationController.postApplication);
ApplicationRouter.post('/accept/:applicationId', authContoller.validateToken, ApplicationController.acceptApplication);
ApplicationRouter.post('/reject/:applicationId', authContoller.validateToken, ApplicationController.rejectApplication);

module.exports = ApplicationRouter;
