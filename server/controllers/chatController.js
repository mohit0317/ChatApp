//createChat
//getUserChats
//findChat
const chatModel = require('../models/chatModel');

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        })

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        })
        const responce = await newChat.save();
        res.status(200).json(responce);
    }
    catch (error) {
        console.log('Error', Error);
        res.status(500).json(error);
    }
}

const findUserChats = async (req, res) => {
    const userId = req.params.id;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] }
        })
        res.status(200).json(chats);
    }
    catch (error) {
        console.log('Error', Error);
        res.status(500).json(error);
    }
}

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId,secondId] }
        })
        console.log('chat',chat);
        res.status(200).json(chat);
    }
    catch (error) {
        console.log('Error', Error);
        res.status(500).json(error);
    }
}


module.exports = {
    createChat,
    findChat,
    findUserChats
}
