const ApplicationController = require('../controllers/application')
const ApplicationRouter = require('express').Router();
const authContoller = require('../controllers/authController');

// Path: /application/:eventId -> [events]
ApplicationRouter.get('/:eventId', authContoller.validateToken, ApplicationController.getApplication);

// Path: /application/:eventId <- {message? header: {x-auth-token: token}}
ApplicationRouter.post('/:eventId', authContoller.validateToken, ApplicationController.postApplication);

// Path: /application/accept/:appliactionId <- {headers:{x-auth-token: token}}
ApplicationRouter.post('/accept/:applicationId', authContoller.validateToken, ApplicationController.acceptApplication);

// Path: /application/reject/:appliactionId <- {headers:{x-auth-token: token}}
ApplicationRouter.post('/reject/:applicationId', authContoller.validateToken, ApplicationController.rejectApplication);

module.exports = ApplicationRouter;
