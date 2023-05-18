const express = require('express');
const http = require('http');
const ioServer = require('socket.io');
const app = require('./routes/user.routes');
const mongoConnect = require('../database/mongo');
const User = require('../database/models/user.model');
require('dotenv').config();


const server = http.createServer(app);
// set up the socket server and allow all resource to acces the server
const io = ioServer(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            // Verify and decode the JWT
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
            // Get the user information from the database
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
    
            // Attach the user object to the socket
            socket.user = user;
            next();
        } catch (error) {
            console.error('Authentication error', error);
            next(new Error('Authentication error'));
          }
    });

    // Create a Map to track the room for each socket connection
    const socketRoomMap = new Map();

    // Handle 'join' event when a client joins the chat room
    socket.on('join', (room) => {
        socket.join(room);
        console.log('User joined room');
        socketRoomMap.set(socket.id, room); // Store the room information for the socket connection
        socket.emit('join', `You joined ${room}`);
        socket.broadcast.emit('join', `${socket.id} joined ${room}`);
    });

    // Handle 'chat message' event when a client sends a message
    socket.on('chat message', (room, message) => {
        console.log('user sent message');
        io.to(room).emit('chat message', message);
    });

    // Handle 'disconnect' event when a client disconnects
    socket.on('disconnect', () => {
        const room = socketRoomMap.get(socket.id); // Retrieve the room information for the socket connection
        if (room) {
            socket.broadcast.to(room).emit('user left', `${socket.id} has left the chat room`);
            socketRoomMap.delete(socket.id); // Remove the room information for the socket connection
        }
    });
});

server.listen(3001, () => {
    mongoConnect()
        .then(() => { })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
    console.log('Server started running...');
});