const Router = require('express').Router();
const Event = require('../models/Event');

const getEvents = async(res) => {
  const events = await Event.find();
  res.send(events);
};

const getEventByUserId = async() => async (req, res) => {
  const author = req.params.userId;
  const userEvents = await Event.find({author: author});
  res.send({ userEvents, author });
}

exports.getEventByUserId = getEventByUserId;
exports.getEvents = getEvents;
