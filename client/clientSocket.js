const io = require('socket.io-client');
const { retrieveToken } = require('./utils/tokenStorage');
require('dotenv').config();

const token =  retrieveToken();
// connect to the socket server
const client = io('http://localhost:3001', {
    auth: {
        token: token
      }
});
client.on('connect', () => {});

// Handles 'chat message' event when another user sends a message
client.on('chat message', (message) => {
    console.info(message);
});

// Handles 'join' event when a user join a room
client.on('join', (info) => {
    console.info(info);
});

// // Handles 'user left' event when a user leaves a room
client.on('user left', (info) => {
    console.log(info);
});

module.exports = client;