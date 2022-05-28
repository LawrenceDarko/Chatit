const mongoose = require('mongoose');
const router = require('../routes/userRoutes');

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array
    }
}, {timestamps: true});



module.exports = mongoose.model('Conversation', ConversationSchema);