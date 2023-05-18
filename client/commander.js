const { Command } = require('commander');
// const { prompt } = require('inquirer');
const mongoConnect = require('../database/mongo');
const client = require('./clientSocket');
const getMenuOption = require('./utils/getMenuOption');
const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const createChatRoom = require('./utils/createChatRoom');
const joinChatRoom = require('./utils/joinChatRoom');
const getAuthOption = require('./utils/getAuthOption');
const exitApp = require('./utils/exitApp');


mongoConnect()
  .then(() => {})
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

    // // Exit the app when user select Exit
    // if (selectedOption === 'Exit') {
    //   console.info('Exited Terminal Chat App Successfully!');
    //   process.exit(0);
    // }

    // Render authentication interface according to what the user selects
    render[authOption]();

    // display home menu  after succesful authentication
    const homeOption = await getMenuOption();
    
    // Render menu interface according to what the user selects
    render[homeOption](client);
  });

program.parse(process.argv);