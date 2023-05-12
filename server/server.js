const express = require('express');
const http = require('http');
const ioServer = require('socket.io');

const app = express();
const server = http.createServer(app);
// set up the socket server and allow all resource to acces the server
const io = ioServer(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.broadcast.emit('chat message', `${socket.id} connected`);
    socket.on('chat message', (message) => {
        socket.broadcast.emit('chat message', message);
    });
});

server.listen(3001, () => {
    console.log('Server started running...');
});