const User = require("../models/User").User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = async (user) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const check = await User.findOne({ username });
    if (check) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, password });
    await user.save();
    const token = await generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
}

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid username or password" });
    }
    const token = await generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: "Invalid Username or password" })
  }
}

const validateToken = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send({ error: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).send({ error: "Invalid token" });
    }
    req.user = user;
  }
  catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
  next();
}

module.exports.signUp = signUp
module.exports.signIn = signIn
module.exports.validateToken = validateToken

