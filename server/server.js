const http = require('http');
const ioServer = require('socket.io');
const jwt = require('jsonwebtoken');
const app = require('./routes/user.routes');
const mongoConnect = require('../database/mongo');
const User = require('../database/models/user.model');
require('dotenv').config();


const server = http.createServer(app);
// set up the socket server and allow all resource to acces the server
const io = ioServer(server, { cors: { origin: "*" } });

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
            socket.username = user.username;
            console.log('user', socket.username);
            
            next();
        } catch (error) {
            console.error('Authentication error', error);
            next(new Error('Authentication error'));
          }
    });


io.on('connection', (socket) => {
    

    // Create a Map to track the room for each socket connection
    const socketRoomMap = new Map();
    const socketObject = {};

    // Handle 'join' event when a client joins the chat room
    socket.on('join', (room) => {
        // when a user joins a room, the socket.rooms should be stored
        // in a key value object along with the username
        socket.join(room);
        // console.log(socket.rooms);
        socketRoomMap.set(socket.username, room); // Store the room information for the socket connection
        socket.emit('joined', `You joined ${room}`);
        socket.broadcast.emit('user joined', `${socket.username} joined ${room}`);
    });

    // Handle 'chat message' event when a client sends a message
    socket.on('chat message', (room, message) => {
        io.to(room).emit('chat message', `${socket.username}: ${message}`);
    });

    // Handle 'disconnect' event when a client disconnects
    socket.on('disconnecting', () => {
        const room = socketRoomMap.get(socket.username); // Retrieve the room information for the socket connection
        if (room) {
            socket.broadcast.to(room).emit('user left', `${socket.username} left the chat room`);
            socketRoomMap.delete(socket.username); // Remove the room information for the socket connection
        }
    });
});

server.listen(3000, () => {
    mongoConnect()
        .then(() => { })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
    console.log('Server started running...');
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.stack);
    // Perform any necessary cleanup or logging here
  
    // Gracefully exit the process
    process.exit(1);
  });