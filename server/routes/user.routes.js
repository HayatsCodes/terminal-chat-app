const express = require('express');

const app = express();
require('dotenv').config();
const User = require('../../database/models/user.model');

app.use(express.json());

// Register API endpoint
app.post('/register', async (req, res) => {
    try {
      console.log(req.body);
      const { username, email, password } = req.body;
  
      // Check if the username or email already exists
      const existingUser = await User.findOne().or([{ username }, { email }]);
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error', error);
      res.status(500).json({ message: 'Registration error' });
    }
  });

  // Login API endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.json({ token });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Login error' });
  }
});

  module.exports = app;