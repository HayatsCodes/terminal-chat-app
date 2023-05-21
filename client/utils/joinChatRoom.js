const { prompt } = require('inquirer');
const chatRoom = require('../../server/src/models/chatRoom.model');
const chatMessage = require('./chatMessage');

module.exports = async function joinChatRoom(client, room = null) {
    if (room) {
        client.emit('join', room);
    } else {
        const chatRooms = await chatRoom.find().select('name');
        const chatRoomsOption = [
            {
                type: 'list',
                name: 'selectedRoom',
                message: 'Choose a Chat Room:',
                choices: chatRooms,
            },
        ]
        const { selectedRoom } = await prompt(chatRoomsOption);
        client.emit('join', selectedRoom);
        chatMessage(client, selectedRoom);
    }
}
