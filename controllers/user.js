const Event = require('../models/Event');
const getPartOf = async (req, res) => {
  const user = req.user;
  const events = await Event.find({ usersAccepted: user._id });
  res.send(events);
}
