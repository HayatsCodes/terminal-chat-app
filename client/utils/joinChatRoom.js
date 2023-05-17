const { prompt } = require('inquirer');
const chatRoom = require('../../database/models/chatRoom.model');
const chatMessage = require('./chatMessage');

module.exports = async function joinChatRoom(client, room=null) {
    if (room) {
        client.emit('join', room);
        return;
    }

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
    client.on('join', (info) => {
        console.info(info);
    })
    chatMessage(client, selectedRoom);
}
