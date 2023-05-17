const io = require('socket.io-client');

// connect to the socket server
const client = io('http://localhost:3001');
client.on('connect', () => {});

// Handles 'chat message' event when another user sends a message
client.on('chat message', (message) => {
    console.log(message);
});

// Handles 'join' event when a user join a room
client.on('join', (info) => {
    console.info(info);
});

// // Handles 'user left' event when a user leaves a room
client.on('user left', (info) => {
    console.log(info);
})

module.exports = client;