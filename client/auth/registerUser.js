const { prompt } = require('inquirer');
const axios = require('axios');

const loginUser = require('./loginUser');

const registerUser = async () => {
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
    },
  ];

  try {
    const answers = await prompt(questions);
    const { username, email, password } = answers;

    const response = await axios.post('http://localhost:3001/register', {
      username,
      email,
      password,
    });

    console.log(response.data.message); // Registration successful
    loginUser(username, password, email);
  } catch (error) {
    console.error(error.response.data); // Registration error
  }
};

module.exports = registerUser;