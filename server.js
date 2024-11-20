// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Unknown User In Login Page');

  // Handle user joining the chat
  socket.on('join', (username) => {
    socket.username = username;
    io.emit('message', { username: 'Peleyadi', message: `${username} has joined the chat.` });
    console.log(username,' Has Joined');
  });

  // Handle incoming messages
  socket.on('message', (message) => {
    io.emit('message', { username: socket.username, message });
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('message', { username: 'System', message: `${socket.username} has left the chat.` });
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
