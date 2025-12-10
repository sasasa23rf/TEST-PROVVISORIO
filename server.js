const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Receive joystick data from the client (Right side logic source)
  socket.on('joystick_command', (msg) => {
    // Send it back to the client (Left side logic destination)
    // We broadcast to everyone or just emit back. 
    // The requirement says "server must send it back to the index page".
    io.emit('server_echo', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`listening on *:${PORT}`);
});
