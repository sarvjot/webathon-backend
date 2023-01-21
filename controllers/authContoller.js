import User from "../models/User";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const signUp = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    await user.save();
    const token = generateToken(user);
    res.status(201).send({ token });
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
    const token = generateToken(user);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send
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

export { signUp, signIn, validateToken };
