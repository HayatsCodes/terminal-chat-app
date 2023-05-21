const http = require('http');
const ioServer = require('socket.io');
const app = require('./app');
const mongoConnect = require('../database/mongo');
const socketManager = require('./socketManager');
require('dotenv').config();

// Create server from express app
const server = http.createServer(app);

// set up the socket server and allow all resource to acces the server
const io = ioServer(server, { cors: { origin: "*" } });

// Manage socket connections
socketManager(io);

server.listen(3001, () => {
    // Connect to Mongo
    mongoConnect()
        .then(() => { })
        .catch((error) => {
            console.error('MongoDB connection error: ', error);
        });
    console.log('Server started running...');
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });