const io = require('socket.io-client');
const { retrieveToken } = require('./utils/tokenStorage');
require('dotenv').config();

const token =  retrieveToken();
// connect to the socket server
const client = io('http://localhost:3000', {
    auth: {
        token: token
      }
});
client.on('connect', () => {});

// Handles 'chat message' event when another user sends a message
client.on('chat message', (message) => {
    console.info(message);
});


client.on('joined', (info) => {
    console.info(info);
});

client.on('user joined', (info) => {
    console.info(info);
});

// // Handles 'user left' event when a user leaves a room
client.on('user left', (info) => {
    console.log(info);
});

module.exports = client;