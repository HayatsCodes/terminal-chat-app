const http = require('http');
const ioServer = require('socket.io');
const redisClient = require('./src/utils/redisClient');
const app = require('./app');
const mongoConnect = require('./src/config/mongo');
const socketManager = require('./socketManager');
require('dotenv').config();

// Create server from express app
const server = http.createServer(app);

// set up the socket server and allow all resource to acces the server
const io = ioServer(server, { cors: { origin: "*" } });

// Manage socket connections
socketManager(io);

server.listen(3001, async () => {
    // Connect to Mongo
    await mongoConnect();
    // connect to redis
    await redisClient.connect();
    console.log('Server started running...');
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });