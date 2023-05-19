const { Command } = require('commander');
const mongoConnect = require('../database/mongo');
const client = require('./clientSocket');
const getMenuOption = require('./utils/getMenuOption');
const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const createChatRoom = require('./utils/createChatRoom');
const joinChatRoom = require('./utils/joinChatRoom');
const getAuthOption = require('./utils/getAuthOption');
const exitApp = require('./utils/exitApp');
require('dotenv').config()


mongoConnect()
  .then(() => { })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const program = new Command();

program.version('1.0.0').description('Terminal Chat App');

const render = {
  'Register': registerUser,
  'Login': loginUser,
  'Create-Chat-Room': createChatRoom,
  'Join-Chat-Room': joinChatRoom,
  'Exit': exitApp
};


// Start Terminal chat app
program
  .description('Starts the Terminal chat app')
  .command('start').action(async () => {   
      // Display Authentication menu
      const authOption = await getAuthOption();

      // Render authentication interface according to what the user selects
      await render[authOption]();

      // Display Home menu  after succesful authentication
      const homeOption = await getMenuOption();

      // Render menu interface according to what the user selects
      await render[homeOption](client);
    }

  );

program.parse(process.argv);

// How to use redis to store the token