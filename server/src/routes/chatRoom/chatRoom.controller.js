const ChatRoom = require("../../models/chatRoom.model");

async function createChatRoom(req, res) {
    try {
        const { roomName } = req.body;
        const isRoomExist = await ChatRoom.findOne({ roomName });
        if (isRoomExist) {
            res.status(409).json({ message: 'Chat room already exists' });
        } else {
            const chatRoom = new ChatRoom(req.body);
            const savedChatRoom = await chatRoom.save();
            res.status(201).json(savedChatRoom.roomName);
        }
    } catch (err) {
        res.status(500).json({message: 'Chat room creation failed'});
    }
}

async function joinChatRoom(req, res) {
    try {
        const chatRooms = await ChatRoom.find({}, 'roomName');
        const roomNames = chatRooms.map((chatRoom) => chatRoom.roomName);
        res.status(200).json(roomNames);
    } catch(err) {
        res.status(500).json({message: 'couldn\'t join chat room'});
    }
}

module.exports = {
    createChatRoom,
    joinChatRoom,
}