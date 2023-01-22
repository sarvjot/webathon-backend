const Application = require('../models/Application')
const Event = require('../models/Event');
const User = require('../models/User').User;


const getApplication = async (req, res) => {
  const applications = await Application.find({ event: req.params.eventId })
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res.status(404).send({ error: 'Event not found' });
  }
  if (event.author.toString() != req.user._id.toString()) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  for (var i = 0; i < applications.length; i++) {
    applications[i].userName = await User.findById(applications[i].applicant);
  }
  res.send(applications);
}

const postApplication = async (req, res) => {
  const applicant = req.user;
  if (!applicant) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res.status(404).send({ error: 'Event not found' });
  }
  if (event.usersAccepted.includes(applicant._id)) {
    return res.status(400).send({ error: 'You have been accepted to this event' });
  }
  const application = await Application.findOne({ applicant: applicant._id, event: event._id });
  if (application) {
    console.log(application)
    return res.status(400).send({ error: 'Application already exists' });
  }
  try {
    console.log(req.body)
    if (req.body.message) {
      const newApplication = new Application({
        message: req.body.message,
        applicant: applicant._id,
        event: event._id,
      })
      await newApplication.save();
      return res.status(201).send(newApplication);
    } else {
      const newApplication = new Application({
        applicant: applicant._id,
        event: event._id,
      })
      await newApplication.save();
      return res.status(201).send(newApplication);
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send("Application saving failed")
  }
}

const acceptApplication = async (req, res) => {
  const application = await Application.findById(req.params.applicationId);
  if (!application) {
    return res.status(404).send({ error: 'Application not found' });
  }
  const eventID = application.event;
  const event = await Event.findById(eventID);
  if (!event) {
    return res.status(404).send({ error: 'Event not found' });
  }
  const user = req.user

  if (event.author.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  if (event.usersAccepted.length >= event.usersRequired) {
    return res.status(400).send({ error: 'Event is full' });
  }

  try {
    event.usersAccepted.push(application.applicant);
    await event.save();
    application.delete();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(400).send("Application accepting failed")
  }
}

const rejectApplication = async (req, res) => {
  const application = await Application.findById(req.params.applicationId);
  if (!application) {
    return res.status(404).send({ error: 'Application not found' });
  }
  const event = await Event.findById(application.event);
  const user = req.user;
  if (event.author.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    await application.delete();
    return res.status(200).send(application);
  }
  catch (error) {
    return res.status(400).send("Application rejecting failed")
  }
}

exports.getApplication = getApplication;
exports.acceptApplication = acceptApplication;
exports.postApplication = postApplication;
exports.rejectApplication = rejectApplication;
