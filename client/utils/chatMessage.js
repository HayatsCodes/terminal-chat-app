module.exports = function chatMessage(client, room) {
    process.stdin.on('data', (data) => {
            const message = data.toString().trim();
            client.emit('chat message', room, message);
        });
}