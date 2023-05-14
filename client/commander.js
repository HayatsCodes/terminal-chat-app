const { Command } = require('commander');
// const { prompt } = require('inquirer');

const client = require('./clientSocket');
const getMenuOption = require('./utils/getMenuOption');

const program = new Command();

program.version('1.0.0').description('Terminal Chat App');

const render = {
  'Create-Chat-Room': createChatRoom,
  'Join-Chat-Room': joinChatRoom
};


// Start Terminal chat app
program
  .description('Starts the Terminal chat app')
  .command('start').action(async () => {
    // Render interface according to what the user selects
    const selectedOption = await getMenuOption();

    if (selectedOption === 'Create-Chat-Room') {
      console.log('Creating Chat Room');
      // create chat room function
      // ask if he wants to join the chat room he created
    } else if (selectedOption === 'Join-Chat-Room') {
      console.log('Joining...');
      // list the created chat rooms
      // should be able to select any of the chat rooms
    } else if (selectedOption === 'Exit') {
      console.info('Exited Terminal Chat App Successfully!');
      process.exit(0);
    }

  });

program.parse(process.argv);


// process.stdin.on('data', (data) => {
        //     const message = data.toString().trim();
        //     client.emit('chat message', message);
        // });
