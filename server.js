const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

// Enable CORS for local HTML file
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Simple health check endpoint
app.get('/', (req, res) => {
  res.send('Joystick Server is running!');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joystick_command', (msg) => {
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
