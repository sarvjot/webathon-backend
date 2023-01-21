const app = require('express')();
const server = require('http').createServer(app);
const http = require('http').createServer(app);
const EventRouter = require('./routes/Event');
const io = require('socket.io')(http, {
  cors: { origin: "*" },
  path: '/api/events'
})

app.use('/event',EventRouter);

const port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


