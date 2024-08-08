// script.js
const socket = io();

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  if (username) {
    socket.emit('join', username);
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
  }
});

document.getElementById('messageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const message = document.getElementById('message').value.trim();
  if (message) {
    socket.emit('message', message);
    document.getElementById('message').value = '';
  }
});

socket.on('message', function(data) {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`;
});
