const Event = require('../models/Event')
const Application = require('../models/Application')
const { application } = require('express')

const getPartOf = async (req, res) => {
  const user = req.user
  const events = await Event.find({ usersAccepted: user._id })
  res.send(events)
}
const anyTrues = a => {
  const flag = false
  a.forEach(t => {
    if (t) flag = true
  })
  return flag
}
const appliedEvents = async (req, res) => {
  const user = req.user
  const unacceptedApplications = await Application.find({ applicant: user._id })
  const allEvents = await Event.find({})
  const unacceptedEvents = []
  // console.log(unacceptedApplications)
  // console.log(allEvents)
  unacceptedApplications.forEach(e1 =>
    allEvents.forEach(e2 => {
      // console.log(e2.id.toString())
      // console.log(e1.event.toString())
      if (e2.id.toString() === e1.event.toString()) {
        console.log(e1.event.toString())
        unacceptedEvents.push(e2)
      }
    })
  )
  res.send({ applications: unacceptedApplications, events: unacceptedEvents })
}

exports.getPartOf = getPartOf
exports.appliedEvents = appliedEvents
