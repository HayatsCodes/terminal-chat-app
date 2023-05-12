const express = require('express');
const http = require('http');
const ioServer = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = ioServer(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('message', (message) => {
        io.emit('message', message);
    })
});

server.listen(3001, () => {
    console.log('Server started running...');
});