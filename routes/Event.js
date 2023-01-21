const EventRouter = require('express').Router();
const eventControllers = require('../controllers/event');
const authContoller = require('../controllers/authController');

EventRouter.get('/', eventControllers.getEvents);
EventRouter.get('/:userId', eventControllers.getEventByUserId);
EventRouter.post('/', authContoller.validateToken, eventControllers.addEvent);


module.exports = EventRouter;
