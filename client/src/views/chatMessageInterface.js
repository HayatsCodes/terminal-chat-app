const readline = require('readline');
const exitApp = require('../menu/exitApp');
const getMenuOption = require('./getMenuOption');
const render = require('./renderInterface');

function chatMessageInterface(client, chatRoom) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (input) => {
    const message = input.trim();
    if (message === '-e') {
      rl.close(); // Close the readline interface
      exitApp();
    } else if (message === '-h') {
      rl.close();
      client.disconnect();

      const homeOption = await getMenuOption();

      // Render menu interface according to what the user selects
      const chatRoom = await render[homeOption](client);

      // Start chat room messaging
      chatMessageInterface(client, chatRoom);
    }
    client.emit('chat message', chatRoom, message);
  });
};

module.exports = chatMessageInterface;
