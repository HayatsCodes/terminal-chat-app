const { Command } = require('commander');
const { prompt, Separator } = require('inquirer'); // Add Separator to the destructuring assignment
const client = require('./client');
// const { default: separator } = require('inquirer/lib/objects/separator');

const program = new Command();

program.version('1.0.0').description('Terminal Chat App');

// Define the option choices
const homeOptions = [
  {
    type: 'list',
    name: 'selectedOption',
    message: 'Home',
    choices: [
      { name: 'Create-Chat-Room', value: 'Create-Chat-Room', message: 'Create a Chat Room' },
      { name: 'Join-Chat-Room', value: 'Join-Chat-Room', message: 'Join a Chat Room' },
      { name: 'Exit', value: 'Exit', message: 'Exit the App' },
    ]
  },

];


// Start Terminal chat app
program
.description('Starts the Terminal chat app')
.command('start').action(async () => {
  let exit = false;


  // Prompt user, when app starts
  const { selectedOption } = await prompt(homeOptions);

  if (selectedOption === 'Exit') {
    console.info('Exited Terminal Chat App Successfully!');
    process.exit(0);
  } else if (selectedOption === 'Create-Chat-Room') {
    console.log('Creating Chat Room');
    // create chat room function
    // ask if he wants to join the chat room he created
  } else if (selectedOption === 'Join-Chat-Room') {
    console.log('Joining...');
    // list the created chat rooms
    // should be able to select any of the chat rooms
  }

});

program.parse(process.argv);


// process.stdin.on('data', (data) => {
        //     const message = data.toString().trim();
        //     client.emit('chat message', message);
        // });
