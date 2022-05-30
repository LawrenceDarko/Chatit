To establish a one on one chat with a user

Login as person A

Load all users from the database on the sidebar 

Creating Conversation
*************************

Create a conversation between person A and any other user
    A conversation should contain three IDS
        Id1: id of person A
        Id2: id of person B
        Id3: Conversation ID
    
    All conversations should be in one collection

    A conversation should consist of only two persons ids i.e A and B

    When a user logs in fetch all conversions bearing the id of the current User and save it as an object

    When current user clicks on any user from the sidebar fetch that user id (friendId)

    Take the friendId and search through the current User saved conversion list to find conversation that also bears the id of the friend

    fetch that conversation and that its id (conversationId)

Sending Messages
*******************

Messages should be in a different collection as well

A message should contain the message, the sender id, the conversation id
    When a conversation id is established, anytime any of the users sends a message the message bears the conversation id 

When the current user clicks on any of the available users, check to see if there is a conversation between the two by comparing both their id

If there is no conversation then create a new conversation between the two

else if there is a conversation fetch the conversation Id, move to the messages collection and fetch all messages bearing the conversation id

Display the messages



Use Socket.io for Real-time interactions
****************************************
Cheat Sheet

From Server to Client
*********************
    Alway use io

    Send to Every Client - io.emit
    Send to One Client - io.to(SocketID).emit

Take from Client
****************
    socket.on

From Client to Server
*********************
use socket

Send to Server - socket.emit
Take from Server - socket.on  