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

module.exports = async function createChatRoom(client) {
  const answer = await prompt(question);
  const roomName = answer.roomName;

  const isRoomExist = await chatRoom.findOne({ name: roomName });

  if (isRoomExist) {
    console.info('Room already exists');
    createChatRoom(client); // Recursive call to prompt again
  } else {
    await chatRoom.create({ name: roomName });
    console.log(`${roomName} chat room created`);
    joinChatRoom(client, roomName);
    chatMessage(client, roomName);
  }
};
