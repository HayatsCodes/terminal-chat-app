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

    const response = await axios.post('https://command-line-chat-app.onrender.com/auth/register', {
      username,
      email,
      password,
    });

    console.info(response.data.message); // Registration successful
    console.info('-----------------------');
    const token = loginUser(username, password, email);
    return token;
  } catch (error) {
    if ( error.response.data.message === 'Username or email already exists') {
      console.info(error.response.data.message);
      registerUser();
    } else {
      console.error(error.response.data);
    }
  }
};

module.exports = registerUser;