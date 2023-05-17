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






  // module.exports = function chatMessage(client, room) {
//     console.log('Setting up chat room...');
//     try {
//         process.stdin.on('data', (data) => {
//             const message = data.toString().trim();
//             console.log('message');
//             client.emit('chat message', room, message);
//         });
//     } catch (error) {
//         console.error('Error setting up process.stdin:', error);
//     }
// }