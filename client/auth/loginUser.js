const axios = require('axios')
const { prompt } = require('inquirer');

const loginUser = async (username, password, email = null) => {
  if (email) {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      const token = response.data.token;
      process.env.AUTH_TOKEN = token;

      console.log(response.data.message); // login successful

    } catch (error) {
      console.error(error.response.data); // login error
    }
  } else {
    const questions = [
      {
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
      },
    ];

    try {
      const answers = await prompt(questions);
      const { username, password } = answers;

      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      const token = response.data.token;
      process.env.AUTH_TOKEN = token;

      console.log(response.data.message); // login successful
    } catch (error) {
      if (error.response.data.message === 'Invalid username or password') {
        console.info(error.response.data.message);
        loginUser(username, password)
      } else {
        console.error(error.response.data); 
      }
    }
  }
};

module.exports = loginUser;
