const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
}, { timestamps: true }
);

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;