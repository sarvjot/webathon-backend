const Event = require('../models/Event');
const Application = require('../models/Application');
const { application } = require('express');

const getPartOf = async (req, res) => {
  const user = req.user;
  const events = await Event.find({ usersAccepted: user._id });
  res.send(events);
}
const anyTrues = (a)=>{
  a.forEach(t=>{
    if(t) return true  })
}
const appliedEvents = async (req, res) => {
  const user = req.user;
  const unacceptedApplications = await Application.find({applicant: user._id});  
  const allEvents = await Event.find({});
  const unacceptedEvents = allEvents.filter(e => anyTrues(unacceptedApplications.map(application => application.event === e.id)) );
  res.send({applications: unacceptedApplications,events: unacceptedEvents});
}

exports.getPartOf = getPartOf;
exports.appliedEvents = appliedEvents;