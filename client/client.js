const io = require('socket.io-client');

// connect to the socket server
const client = io('http://localhost:3001');
client.on('connect', () => {
    // console.log('Connected to server')
});


client.on('chat message', (message) => {
    console.log(message);
});

module.exports = client;