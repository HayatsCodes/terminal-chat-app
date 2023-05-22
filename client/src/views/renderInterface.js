const registerUser = require('../auth/registerUser');
const loginUser = require('../auth/loginUser');
const createChatRoom = require('../menu/createChatRoom');
const joinChatRoom = require('../menu/joinChatRoom');
const exitApp = require('../menu/exitApp');

const render = {
    'Register': registerUser,
    'Login': loginUser,
    'Create-Chat-Room': createChatRoom,
    'Join-Chat-Room': joinChatRoom,
    'Exit': exitApp
};

module.exports = render;