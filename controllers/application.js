const Application = require('../models/Application')
const Event = require('../models/Event');


const getApplication = async (req, res) => {
  const applications = await Application.find({ event: req.params.eventId })
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
  if (Application.exists({
    applicant: applicant._id,
    event: event._id
  }) != null) {
    // console.log(Application.findOne({
    //   applicant: applicant._id,
    //   event: event._id
    // }))
    return res.status(400).send({ error: 'Application already exists' });
  }
  try {
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
  if (event.author !== user._id) {
    // console.log(event.author)
    // console.log(user._id)
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
    // console.log(error);
    return res.status(400).send("Application accepting failed")
  }
}

exports.getApplication = getApplication;
exports.acceptApplication = acceptApplication;
exports.postApplication = postApplication;
