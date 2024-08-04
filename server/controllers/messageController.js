const messageModel = require('../models/messageModel');

//creatingMessage,
//getMessages

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    if (!chatId || !senderId || !text) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const response = await messageModel.create({
            chatId, senderId, text
        })
        res.status(200).json(response);
    }
    catch (error) {
        console.log('Error', error);
        res.status(500).json(error);
    }
}

const getMessagesByChatId = async (req, res) => {
    const { chatId } = req.params;
    try {
        const response = await messageModel.find({ chatId })
        res.status(200).json(response);
    }
    catch (error) {
        console.log('Error', error);
        res.status(500).json(error);
    }
}

module.exports = {
    createMessage,
    getMessagesByChatId
}



