const Router = require('express').Router();

const Event = require('../models/Event');

Router.get('/', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

Router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  const authorData = await User.findById(event.author);
  res.send({ event, authorData });
})


