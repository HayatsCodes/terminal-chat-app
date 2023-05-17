const io = require('socket.io-client');

// connect to the socket server
const client = io('http://localhost:3001');
client.on('connect', () => {});

client.on('chat message', (message) => {
    console.info(message);
});

module.exports = client;

// How client will emit message after creating/joining a chat room