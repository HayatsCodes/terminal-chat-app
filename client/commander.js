const { Command } = require('commander');
// const { prompt } = require('inquirer');
const mongoConnect = require('../database/mongo');
const client = require('./clientSocket');
const getMenuOption = require('./utils/getMenuOption');
const createChatRoom = require('./utils/createChatRoom');

await mongoConnect();

const program = new Command();

program.version('1.0.0').description('Terminal Chat App');

const render = {
  'Create-Chat-Room': createChatRoom,
  // 'Join-Chat-Room': joinChatRoom,
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
    render[selectedOption]();

    // if (selectedOption === 'Create-Chat-Room') {
    //   console.log('Creating Chat Room');
    //   // create chat room function
    //   // ask if he wants to join the chat room he created
    // } else if (selectedOption === 'Join-Chat-Room') {
    //   console.log('Joining...');
    //   // list the created chat rooms
    //   // should be able to select any of the chat rooms
    // } else 
    

  });

program.parse(process.argv);


// process.stdin.on('data', (data) => {
        //     const message = data.toString().trim();
        //     client.emit('chat message', message);
        // });
