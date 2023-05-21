module.exports = (client) => {
    
    client.on('connect', () => { });

    // Handles 'chat message' event when another user sends a message
    client.on('chat message', (message) => {
      console.info(message);
    });

    client.on('joined', (info) => {
      console.info(info);
    });

    client.on('user joined', (info) => {
      console.info(info);
    });

    // // Handles 'user left' event when a user leaves a room
    client.on('user left', (info) => {
      console.info(info);
    });

}