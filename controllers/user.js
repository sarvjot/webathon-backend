const Event = require('../models/Event');
const Application = require('../models/Application');
const { application } = require('express');

const getPartOf = async (req, res) => {
  const user = req.user;
  const events = await Event.find({ usersAccepted: user._id });
  res.send(events);
}

const appliedEvents = async (req, res) => {
  const user = req.user;
  const unacceptedApplications = await Application.find({applicant: user._id});  
  res.json(unacceptedApplications)
}

exports.getPartOf = getPartOf;
exports.appliedEvents = appliedEvents;