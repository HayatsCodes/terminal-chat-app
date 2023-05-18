const { prompt } = require('inquirer');

function getAuthOption() {
  const authOptions = [
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Authentication',
      choices: [
        { name: 'Register', value: 'Register', message: 'Create an account' },
        { name: 'Login', value: 'Login', message: 'Login to your account' },
        { name: 'Exit', value: 'Exit', message: 'Exit the App' },
      ]
    },
  ];

  return prompt(authOptions)
    .then(answers => answers.selectedOption);
}

module.exports = getAuthOption;
