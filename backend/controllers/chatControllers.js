const handleAsync = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = handleAsync(async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.status(400).send("Please enter all fields");
    }
    
    const chat = await Chat.find({
        // isSingle: true, 
        $and: [
            { users: {$elematch: {$eq: req.user._id}}},
            { users: {$elematch: {$eq: userId}}}
        ],
    }).populate('users', '-password')
    .populate('newMessage');

    // const chat = await Chat.find({}, 
    //     { users: {$elematch: {$eq: req.user._id}}},
    //     { users: {$elematch: {$eq: userId}}}
    // ).populate('users', '-password')
    // .populate('newMessage');

    chat = await User.populate(chat, {
        path: 'newMessage.sender',
        select: 'name email',
    });

    if(chat.length > 0){
        res.status(200).send(chat[0]);
    }
    else{
        var chatData = {
            chatName: 'sender',
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id:createdChat._id}).populate('users', '-password')
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400).send(error);
        }
    }
});

module.exports = {accessChat};