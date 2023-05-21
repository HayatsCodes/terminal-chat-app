const express = require('express');
require('dotenv').config();
const { registerUser, loginUser } = require('./auth.controller');

const authRouter = express.Router();

// Register API endpoint
authRouter.post('/register', registerUser);

// Login API endpoint
authRouter.post('/login', loginUser);

module.exports = authRouter;