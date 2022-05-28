const express = require('express');
const { chats } = require('./data/data');
const { dataConnection } = require('./data/db');
// const { registerUser, authenticateUser } = require('./routes/userRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messages');
const conversationRoutes = require('./routes/conversations');

dataConnection();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})