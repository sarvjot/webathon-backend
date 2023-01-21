const app = require('express')();
const server = require('http').createServer(app);
const http = require('http').createServer(app);
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const authController = require('./controllers/authController');
// express json
app.use(require('express').json());
const EventRouter = require('./routes/Event');
const ApplicationRouter = require('./routes/Application');

const io = require('socket.io')(http, {
  cors: { origin: "*" },
  path: '/api/events'
})

app.use('/event', EventRouter);
app.post('/signUp', authController.signUp);
app.post('/signIn', authController.signIn);
app.use('/application',ApplicationRouter);
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


