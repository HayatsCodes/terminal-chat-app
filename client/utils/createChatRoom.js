const { prompt } = require('inquirer');

const question = [
    {
        type: 'input',
        name: 'roomName',
        message: 'Enter Room Name'
    }
]

function createChatRoom(client) {
    // ask user for the chat room name
    const roomName = prompt(question)
    .then(answer => {answer.roomName})
    // must be unique
    // create the chat room using socket
    client.emit('join', roomName)
}