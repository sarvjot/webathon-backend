const app = require('express')();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
dotenv.config();
app.use(cors({
  origin: '*',
  credentials: true
}))
// express json
app.use(require('express').json());
const server = require('http').createServer(app);

const EventRouter = require('./routes/Event');
const ApplicationRouter = require('./routes/Application');
const AuthRouter = require('./routes/auth');
const UserRouter = require('./routes/user');
app.use('/event', EventRouter);
app.use('/application', ApplicationRouter);
app.use('/auth', AuthRouter);
app.use('/user', UserRouter)

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});


const port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


