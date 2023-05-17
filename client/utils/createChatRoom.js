const { prompt } = require('inquirer');
const chatRoom = require('../../database/models/chatRoom.model');
const joinChatRoom = require('./joinChatRoom');
const chatMessage = require('./chatMessage');
const question = [
    {
        type: 'input',
        name: 'roomName',
        message: 'Enter Room Name'
    }
]

module.exports = function createChatRoom(client) {
    // ask user for the chat room name
    prompt(question)
        .then((answer) => 
        { 
            const roomName = answer.roomName;
            const isRoomExist = chatRoom.findOne({name: roomName});
            if (isRoomExist) {
                console.info('Room already exist')
                createChatRoom()
            }
            chatRoom.create({name: roomName});
            console.log(`${roomName} chat room created`);
            joinChatRoom(client, roomName);
            chatMessage(client, roomName);
         });
}