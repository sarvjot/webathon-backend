const Router = require('express').Router();
const Event = require('../models/Event');

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.send(events);
};

const getEventByUserId = async () => async (req, res) => {
  const author = req.params.userId;
  const userEvents = await Event.find({ author: author });
  res.send({ userEvents, author });
}

const addEvent = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    let target;
    const { title, desc } = req.body;
    try {
      const targetNumber = parseInt(req.body.target);
      target = targetNumber;
      if (target < 1) {
        return res.status(400).send({ error: 'Target must be greater than 0' });
      }
    } catch (err) {
      return res.status(400).send({ error: 'Target must be a number' });
    }
    const event = new Event({
      eventName: title,
      description: desc,
      usersRequired: target,
      usersAccepted: [user._id],
      applications: [],
      author: user._id,
    });
    await event.save();
    res.status(201).send(event);

  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: "Incomplete Data" });
  }
}

exports.getEventByUserId = getEventByUserId;
exports.getEvents = getEvents;
exports.addEvent = addEvent;
