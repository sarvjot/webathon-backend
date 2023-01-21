const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" },
  path: '/api/events'
})
const port = process.env.PORT || 8000;
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


