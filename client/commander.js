const { Command } = require('commander');
const { prompt, Separator } = require('inquirer'); // Add Separator to the destructuring assignment
const client = require('./client');
// const { default: separator } = require('inquirer/lib/objects/separator');

const program = new Command();

program.version('1.0.0').description('Terminal Chat App');

// Define the option choices
const options = [
  { name: 'Create-Chat-Room', value: 'Create-Chat-Room', message: 'Create a Chat Room' },
  { name: 'Join-Chat-Room', value: 'Join-Chat-Room', message: 'Join a Chat Room' },
  { name: 'Exit', value: 'Exit', message: 'Exit the App' },
];

// Start Terminal chat app
program.command('start').action(async () => {
  let exit = false;



  // when the app starts a list of option should be shown that prompts user
  const { selectedOption } = await prompt({
    type: 'list',
    name: 'selectedOption',
    message: 'Home',
    choices: [...options],
  });

  if (selectedOption === 'Exit') {
    // exit = true;
    console.log('Exiting the App...');
    process.exit(0);
  } else if (selectedOption === 'Create-Chat-Room') {
    new Separator(`${selectedOption}`);

  } else if (selectedOption === 'Join-Chat-Room') {
    new Separator(`${selectedOption}`);
  }


  // When an option is selected. Only the Home and exit button should be visible
  // when the home button is selected the options should be re-rendered
  // when the exit button is selected the app should exit

  // new Separator(), { name: 'Home', value: 'Home', message: 'Go back to Home'

  //   while (!exit) {
  //     const { selectedOption } = await prompt({
  //       type: 'list',
  //       name: 'selectedOption',
  //       message: 'Home',
  //       choices: [...options],
  //     });

  //     // if (selectedOption === 'Home') {
  //     //   continue;
  //     // } else 
  //     if (selectedOption === 'Exit') {
  //       // exit = true;
  //       console.log('Exiting the App...');
  //       process.exit(0);
  //     } else if (selectedOption === 'Create-Chat-Room') {
  //       console.log('Creating Chat Room...');

  //     } else if (selectedOption === 'Join-Chat-Room') {
  //       console.log('Joining Chat Room...');
  //     }

  //     // Additional logic for each option can be added here
  //   }
});

program.parse(process.argv);


// process.stdin.on('data', (data) => {
        //     const message = data.toString().trim();
        //     client.emit('chat message', message);
        // });
