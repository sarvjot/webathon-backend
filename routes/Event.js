const EventRouter = require('express').Router();
const eventControllers = require('../controllers/event');

EventRouter.get('/', eventControllers.getEvents);
EventRouter.get('/:userId',eventControllers.getEventByUserId);


module.exports = EventRouter;