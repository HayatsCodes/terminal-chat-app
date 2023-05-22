const express = require('express');
require('dotenv').config();
const { registerUser, loginUser, getToken } = require('./auth.controller');

const authRouter = express.Router();

// Register API endpoint
authRouter.post('/register', registerUser);

// Login API endpoint
authRouter.post('/login', loginUser);

// Token API endpoint
authRouter.get('/tokens/:id', getToken);

module.exports = authRouter;