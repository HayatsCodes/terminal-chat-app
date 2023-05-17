const readline = require('readline');

module.exports = function chatMessage(client, room) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    const message = input.trim();
    client.emit('chat message', room, message);
  });
};
