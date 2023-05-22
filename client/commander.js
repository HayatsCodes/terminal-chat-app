const { Command } = require('commander');
const io = require('socket.io-client');

const getAuthOption = require('./src/views/getAuthOption');
const getMenuOption = require('./src/views/getMenuOption');
const chatMessageInterface = require('./src/views/chatMessageInterface');
const render = require('./src/views/renderInterface');
const attachEvents = require('./attachEvents');

const program = new Command();

program.version('1.0.0').description('Terminal Chat App');

// const render = {
//   'Register': registerUser,
//   'Login': loginUser,
//   'Create-Chat-Room': createChatRoom,
//   'Join-Chat-Room': joinChatRoom,
//   'Exit': exitApp
// };


// Start Terminal chat app
program
  .description('Starts the Terminal chat app')
  .command('start').action(async () => {
    // Display Authentication menu
    const authOption = await getAuthOption();

    // Render authentication interface according to what the user selects
    const token = await render[authOption]();

    // connect to the socket server after authentication
    const client = io('http://localhost:3001', {
      auth: {
        token
      }
    });

    // Attach events to client
    attachEvents(client);

    // Display Home menu  after succesful authentication
    const homeOption = await getMenuOption();

    // Render menu interface according to what the user selects
    const chatRoom = await render[homeOption](client);

    // Start chat room messaging
    chatMessageInterface(client, chatRoom);
  }
  );

program.parse(process.argv);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});