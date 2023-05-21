const express = require('express');
const authRouter = require('./src/routes/auth.route');
const chatRoomRouter = require('./src/routes/chatRoom.route');

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/api', chatRoomRouter);

module.exports = app;