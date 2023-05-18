const { Command } = require('commander');
// const { prompt } = require('inquirer');
const mongoConnect = require('../database/mongo');
const client = require('./clientSocket');
const getMenuOption = require('./utils/getMenuOption');
const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const createChatRoom = require('./utils/createChatRoom');
const joinChatRoom = require('./utils/joinChatRoom');

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
  'Join-Chat-Room': joinChatRoom
};


// Start Terminal chat app
program
  .description('Starts the Terminal chat app')
  .command('start').action(async () => {
    
    const selectedOption = await getMenuOption();

    // Exit the app when user select Exit
    if (selectedOption === 'Exit') {
      console.info('Exited Terminal Chat App Successfully!');
      process.exit(0);
    }

    // Render interface according to what the user selects
    render[selectedOption](client);
  });

program.parse(process.argv);