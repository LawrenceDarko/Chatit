const express = require('express');
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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('chatit/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'chatit', 'build', 'index.html'));
    });
}
else{
    app.get("/", (req, res) => {
        res.send("Hello World");
    }); 
}


const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    // pingInterval: 25000,
    // transports: ['websocket'],
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('message', 'hello people');
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
  });

