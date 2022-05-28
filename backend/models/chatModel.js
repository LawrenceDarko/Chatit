const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    isSingle: {type:Boolean,default:true},
    name: {type:String,trim:true},
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }], 
    newMessage: {
        type:Boolean,default:true, 
        ref: 'Message',
    }, 
},
{
    timestamp:true,
}
);

const Chat = mongoose.model('Chat', chatModel);

module.exports = {Chat};