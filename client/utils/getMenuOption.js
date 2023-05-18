const { prompt } = require('inquirer');

function getMenuOption() {
  const menuOptions = [
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Home',
      choices: [
        { name: 'Create-Chat-Room', value: 'Create-Chat-Room', message: 'Create a Chat Room' },
        { name: 'Register', value: 'Register', message: 'Create an account' },
        { name: 'Login', value: 'Login', message: 'Login to your account' },
        { name: 'Join-Chat-Room', value: 'Join-Chat-Room', message: 'Join a Chat Room' },
        { name: 'Exit', value: 'Exit', message: 'Exit the App' },
      ]
    },
  ];

  return prompt(menuOptions)
    .then(answers => answers.selectedOption);
}

module.exports = getMenuOption;
