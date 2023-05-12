const io = require('socket.io-client');

const client = io('http://localhost:3001');
client.on('connect', () => {
    console.log('Connected to server')
});

client.emit('message', 'Terminal chat app runnning!');
client.on('message', (message) => {
    console.log(message);
});

