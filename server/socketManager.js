const jwt = require('jsonwebtoken');
const User = require('./src/models/user.model');

module.exports = (io) => {
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
            next();
        } catch (error) {
            console.error('Authentication error', error);
            next(new Error('Authentication error'));
        }
    });


    io.on('connection', (socket) => {

        // Create a Map to track the room for each socket connection
        const socketRoomMap = new Map();

        // Handle 'join' event when a client joins the chat room
        socket.on('join', (room) => {
            // Emits the username to the client
            socket.emit('username', socket.username);

            socket.join(room);
            // console.log(socket.rooms);
            socketRoomMap.set(socket.username, room); // Store the room information for the socket connection
            socket.emit('joined', `You joined ${room}`);
            socket.broadcast.to(room).emit('user joined', `${socket.username} joined ${room}`);
        });

        // Handle 'chat message' event when a client sends a message
        socket.on('chat message', (room, message) => {
            socket.broadcast.to(room).emit('chat message', `${socket.username}: ${message}`);
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
}