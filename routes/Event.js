const Router = require('express').Router();

const Event = require('../models/Event');

Router.get('/', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});


